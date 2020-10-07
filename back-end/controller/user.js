const User=require('../models/user');
const {Order}=require('../models/order')
exports.getUserById=(req,res,next,id)=>{
	console.log(id);
	User.findById(id,(err,user)=>{
		if(err||!user)
		{
			return res.status(404).json({
				error:err
			})
		}
		//console.log(user);
		req.profile=user;
		next();
	})
	
}

exports.createUser=(req,res)=>{
   const user= new User(req.body);
   user.save((err,user)=>{
   	if(err)
   	{
   		return res.status(400).json('you r not authorized!!');
   	}
   	user.hashed_password=undefined;
   	user.salt=undefined;
   	res.json(user);
   })
}

exports.read=(req,res)=>{
	res.json(req.profile);
}

exports.updateUser=(req,res)=>
{
	const { name, password,about,phone } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password;
            }
        }
         user.about=about;
         user.phone=phone; 
        user.save((err, updatedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }
            updatedUser.hashed_password = undefined;
            updatedUser.salt = undefined;
            res.json(updatedUser);
        });
    })
}


exports.addOrderToHistory=(req,res,next)=>{
	let history=[]

	req.body.order.products.forEach((item)=>{
		history.push({
			_id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transactionID,
            amount: req.body.order.amount
			  
		})
	})

	User.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true},(error,result)=>{
		if (error) {
            return res.status(400).json({
                error: 'Could not update user purchase history'
            });
        }
        next();
    });
	
}
exports.getHistory=(req,res)=>{
  Order.find({user:req.profile._id})
  .populate('user','_id name')
  .sort('-created')
  .exec((err,orders)=>{
	if (err) {
		return res.status(400).json({
			error: err
		})}
		else{
           res.json(orders)
		}
  })
}