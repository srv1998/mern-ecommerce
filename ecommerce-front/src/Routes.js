import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import UserDashboard from './user/UserDashboard';
import UserUpdate from './user/UserUpdate';
import AdminDashboard from './user/AdminDashboard';
import PrivateRoute from './auth/PrivateRoute'; // only signed user can access..
import AdminRoute from './auth/AdminRoute'; 
import CreateCategory from './admin/CreateCategory';
import CreateProduct from './admin/CreateProduct';
import Shop from './core/Shop';
import Product from './core/Product'
import ProductBox from './core/ProductBox';
import Cart from './core/Cart';
import WishList from './core/WishList';
import ForgotPassword from './core/ForgotPassword';
import ResetPassword from './core/ResetPassword'
import NewArrived from './core/NewArrived'
import MostPopular from './core/MostPopular'

import Order from './admin/order';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct'
const Routes= ()=>{
	return(
           
         <BrowserRouter>
         
		  <Switch>
		   <Route path='/' exact component={Home}/> 
		   <Route path='/signin' exact component={Signin}/>
		   <Route path="/signup" exact component={Signup}/>
		   <Route path="/shop" exact component={Shop}/>
		   <Route path="/cart" exact component={Cart}/>
		   <Route path="/wish-list" exact component={WishList}/>
		   <Route path="/product/:productId" exact component={Product}/>
           <Route path="/forgot-password/page" exact component={ForgotPassword}/>
           <Route path="/auth/password/reset/:id" exact component={ResetPassword}/>
		   <Route path="/new-arrived" exact component={NewArrived}/> 
		   <Route path="/most-popular" exact component={MostPopular}/>
         

		   <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
           <PrivateRoute path='/update/:userId' exact component={UserUpdate}/>

           <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
		   <AdminRoute path='/create/category' exact component={CreateCategory}/>
		   <AdminRoute path='/create/product' exact component={CreateProduct}/>
		   <AdminRoute path='/orders/list' exact component={Order}/>  
		   <AdminRoute path='/manageProducts' exact component={ManageProducts}/> 
		   <AdminRoute path='/product/update/:productId' exact component={UpdateProduct}/>  
		  </Switch>
		 </BrowserRouter> 
           
		);
};
export default Routes;