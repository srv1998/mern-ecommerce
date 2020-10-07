const express=require('../node_modules/express');
const {getUserById,addOrderToHistory }=require('../controller/user')
const {getToken,processPayment}=require('../controller/braintree')
const router =express.Router();
const {requireSignIn,isAuth,isAdmin}=require('../controller/auth')
const {createOrder,getAllOrders,getStatusValues,getOrderById,updateStatus,deleteOrder}=require('../controller/order')
const {updateQuantity}=require('../controller/product')

router.post('/orders/create/:userId',requireSignIn,isAuth,addOrderToHistory,updateQuantity,createOrder)
router.get('/orders/getAll/:userId',requireSignIn,isAuth,isAdmin,getAllOrders)
router.get('/orders/statusValues/:userId',requireSignIn,isAuth,isAdmin,getStatusValues)
router.put('/order/statusUpdate/:orderId/:userId',requireSignIn,isAuth,isAdmin,updateStatus)
router.delete('/order/delete/:userId/:orderId',requireSignIn,isAuth,isAdmin,deleteOrder)
router.param('orderId',getOrderById)
router.param('userId',getUserById)

module.exports=router