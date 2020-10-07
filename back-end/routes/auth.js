const express= require('../node_modules/express');
const router=express.Router();
const {signup,signin,signout,requireSignIn,forgotPassword,resetPassword,googleLogin}=require('../controller/auth');
const {sendGridTest}=require('../testSendGrid');

const {signupValidator, forgotPasswordValidator,
    resetPasswordValidator}=require('../validator/index');

 router.get('/',(req,res)=>{
	res.send('hello world');
})
router.post('/signup',signupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout)
router.get('/pics',requireSignIn,(req,res)=>{
	res.send('pics are here...');
})
router.put('/forgot-password', forgotPasswordValidator,  forgotPassword);
router.put('/reset-password', resetPasswordValidator, resetPassword);
router.post('/send-grid-test',sendGridTest)
router.post('/google-login',googleLogin)


 module.exports=router;