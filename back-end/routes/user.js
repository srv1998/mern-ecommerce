const express=require('../node_modules/express');
const router =express.Router();
const {requireSignIn,isAuth,isAdmin}=require('../controller/auth')
const {getUserById,read,updateUser,createUser,getHistory}=require('../controller/user')
const {updateUserValidator} =require('../validator') 
//IsAuth:-makes sure that the user that is signed in and the user profile that is requseted as getUserById is same..
//i.e one user must not access profile of other user..

router.post('/user/create/:userId',requireSignIn,isAuth,isAdmin,createUser)
router.get('/user/:userId',requireSignIn,isAuth,read)
router.put('/user/update/:userId',requireSignIn,isAuth,updateUserValidator,updateUser)
router.get('/user/history/:userId',requireSignIn,isAuth,getHistory)
router.param('userId',getUserById);

module.exports=router;