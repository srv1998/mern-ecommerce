const User =require('../models/user');
const jwt=require('../node_modules/jsonwebtoken'); // to create token..
const expressJwt=require('../node_modules/express-jwt/lib');// to authorize i.e check if user have token...

const sgMail = require('../node_modules/@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const _ =require('../node_modules/lodash')
const {OAuth2Client} =require('../node_modules/google-auth-library')
 exports.signup=(req,res)=>
{
	const user= new User(req.body);

	user.save((err,user)=>
	{
		if(err||!user)
		{
            console.log(err)
			return res.status(400).json({
				error:'email already exists'
			});
		}
		 user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

	})
}

exports.connectFlash=(req,res,next)=>{
   res.locals.flash={
       'success':req.flash('success'),
       'error':req.flash('error')
   }
   next()
}

exports.signin=(req,res)=>{
	const {email,password}=req.body;
	User.findOne({email},(err,user)=>{
		if(err||!user)
		{
			return res.status(400).json({
				error:'please singup first..'
			})
		}
		if(!user.authenticate(password))
	{
		return res.status(400).json({
			error:'email and password does not match!!!'
		})
	}

   const token =jwt.sign({_id:user._id},process.env.JWT_SECRET);

   res.cookie('t',token,{expiry:new Date()+9999});
   const {_id,name,email,role,about,phone}=user;
   req.flash('success','logged in successfully')
   res.json({token,user:{_id,name,email,role,about,phone}});
	})
	
}

exports.signout=(req,res)=>{
	res.clearCookie('t');
	res.json({message:'signed out successfully'});
}

exports.requireSignIn=expressJwt({
	secret:process.env.JWT_SECRET,
	userProperty:"auth"
})

exports.isAuth=(req,res,next)=>{   
	const user=req.profile && req.auth && req.profile._id == req.auth._id; // checking if signedIn user and requested User is same or not.
	if(!user)
	{
		return res.status(400).json({error:'not authorized user'});
	}
	next();
}
exports.isAdmin=(req,res,next)=>{
	if(req.profile.role==0)
	{
		return res.status(400).json('only Admin is allowed!!!');
	}
	next();
}

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist'
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

   
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password reset link`,
            html: `
            <p>Please use the following link to reset your password:</p>
            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://ecomerce.com</p>
        `
        };
        
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ error: err });
            } else {
                sgMail.send(emailData).then(sent => {
                    return res.json({
                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min.`
                    });
                }).catch(err=>console.log(err));
            }
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                });
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
    const idToken = req.body.tokenId;
    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
        // console.log(response)
        const { email_verified, name, email, jti } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    // console.log(user)
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { expiresIn: '1d' });
                    const { _id, email, name, role,about,phone } = user;
                    return res.json({ token, user: { _id, email, name, role,about,phone} });
                } else {
                    
                    
                    let password = jti;
                    user = new User({ name, email,  password });
                    user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            });
                        }
                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        res.cookie('token', token, { expiresIn: '1d' });
                        const { _id, email, name, role,about,phone } = data;
                        return res.json({ token, user: { _id, email, name, role,about,phone } });
                    });
                }
            });
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again.'
            });
        }
    }).catch(err=>console
        .log(err));
};
