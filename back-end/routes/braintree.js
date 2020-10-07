const express=require('../node_modules/express');
const {getUserById}=require('../controller/user')
const {getToken,processPayment}=require('../controller/braintree')
const router =express.Router();
const {requireSignIn,isAuth,isAdmin}=require('../controller/auth')

router.get('/braintree/get_token/:userId',requireSignIn,isAuth,getToken)
router.post('/payment/:userId',requireSignIn,isAuth,processPayment)
router.param('userId',getUserById);
module.exports=router;