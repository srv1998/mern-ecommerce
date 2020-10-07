const express=require('../node_modules/express');
const router= express.Router();
const {createCategory}=require('../controller/category');
const {
	createProduct,
	getProductById,
	read,
	deleteProduct,
	updateProduct,
	readProducts,
	readRelatedProducts,
	getCategories,
	getProductBySearch,
	getProductsBySearchBar,
    getPhoto
     }=require('../controller/product');
const {requireSignIn,isAuth,isAdmin}=require('../controller/auth');
const {getUserById}=require('../controller/user');


router.post('/product/create/:userId',requireSignIn, isAuth, isAdmin,createProduct);
router.get('/product/:productId',read)        // to get a product by using its ID as paramater in route..      
router.delete('/product/delete/:userId/:productId',requireSignIn, isAuth, isAdmin,deleteProduct) // first param is invoked and product with the given ID is found and saved in req.product by getProductById method then the product is deleted after authentication..
router.put('/product/update/:userId/:productId',requireSignIn, isAuth, isAdmin,updateProduct)
router.get('/products',readProducts)  // using queries of sortBy or Order etc..
router.get('/products/searchbox', getProductsBySearchBar)
router.get('/products/related/:productId',readRelatedProducts)
router.get('/products/categories',getCategories);
router.post('/products/by/search',getProductBySearch)  // by category and price range ..in front end
router.get('/product/photo/:productId',getPhoto)


router.param('userId',getUserById);
router.param('productId',getProductById);
module.exports=router;