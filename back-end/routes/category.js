const express=require('../node_modules/express');
const router= express.Router();
const {createCategory,getCategoryById,read,updateCategory,deleteCategory,readAll}=require('../controller/category');
const {requireSignIn,isAuth,isAdmin}=require('../controller/auth');
const {getUserById}=require('../controller/user');
//userTd is passed to check whether the user is authorised or not using isAuth.. 
router.post('/category/create/:userId',requireSignIn,isAuth,isAdmin,createCategory);
router.get('/category/:categoryId',read); // for 1 category...
router.put('/category/update/:userId/:categoryId',requireSignIn,isAuth,isAdmin,updateCategory);
router.delete('/category/delete/:userId/:categoryId',requireSignIn,isAuth,isAdmin,deleteCategory);
router.get('/categories',readAll)

router.param('userId',getUserById);
router.param('categoryId',getCategoryById);
 module.exports=router;