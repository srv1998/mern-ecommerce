const { check } = require('express-validator')
exports.signupValidator=(req,res,next)=>
{
	req.check('name','name is required').notEmpty();
	req.check('email','email is required')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
    
    req.check('password','password is required').notEmpty()
    .isLength({min:6})
    .withMessage('Password must contain 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a digit');
    req.check('phone','phone no. is required')
    .notEmpty()
    .isLength({
        min:10,
        max:10
    }).withMessage('phone no. must contain exactly 10 digits')
    req.check('gender','gender is required').notEmpty();
    req.check('day','day is required').notEmpty();
    req.check('year','year is required').notEmpty();

    const errors= req.validationErrors();   
    if(errors)
    {
    	const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.forgotPasswordValidator = (req,res,next)=>
    {req.check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
        const errors= req.validationErrors();
    if(errors)
    {
    	const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.resetPasswordValidator = (req,res,next)=>
 {   req.check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a digit');
        const errors= req.validationErrors();
        if(errors)
        {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
        }
        next();
};
exports.updateUserValidator = (req,res,next)=>
 {   
        req.check('phone')
        .notEmpty()
        .isLength({
            min:10,
            max:10
        }).withMessage('phone no. must contain exactly 10 digits')
       .isLength 
        const errors= req.validationErrors();
        if(errors)
        {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
        }
        next();
};