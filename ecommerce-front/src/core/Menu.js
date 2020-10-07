import React from 'react';
import {SignOut,isAuthenticated} from '../auth';
import {Link,withRouter} from 'react-router-dom'; //Link in place of <a></a> to prevent page reloading..
import {cartLength,wishListLength} from './CartStorage'
import {FaClipboardList,FaShoppingBag,FaUserCheck} from 'react-icons/fa'
// withRouter:- adds history(actual route) , pathname,location, match ..as props to our current component...(this.props.history)
const isActive=(history,path)=>
{
  
   if(history.location.pathname===path)
   	return {color:'yellow'}
   else
   	return {color:'white'}
}
const Menu=({history})=>(
   <ul className="nav nav-tabs bg-dark ul" style={{position:'relative'}}>
    <li className="nav-item ">
      <Link className="nav-link  " to="/" style={isActive(history,'/')}>Home <i class="fa fa-home" aria-hidden="true"></i></Link>
    </li>
    <li className="nav-item ">
      <Link className="nav-link  " to="/shop" style={isActive(history,'/shop')}>Shop <FaShoppingBag/></Link>
    </li>
    <li className="nav-item ">
<Link className="nav-link  " to="/cart" style={isActive(history,'/cart')}>Cart <i class="fa fa-shopping-cart"></i><sup><small className="cart-count" >{cartLength()}</small></sup></Link>
    </li>
    <li className="nav-item ">
      <Link className="nav-link  " to="/new-arrived" style={isActive(history,'/new-arrived')}>New Arrived</Link>
    </li>
    <li className="nav-item ">
      <Link className="nav-link  " to="/most-popular" style={isActive(history,'/most-popular')}>Most Popular</Link>
    </li>
    <li className="nav-item ">
      <Link className="nav-link  " to="/wish-list" style={isActive(history,'/wish-list')}>Wish List <FaClipboardList/><sup><small className="wish-count" >{wishListLength()}</small></sup></Link>
    </li>
    {!isAuthenticated()&&(
         <React.Fragment>
           <li>
      <Link className="nav-link " to="/signup" style={isActive(history,'/signup')}><i class="fas fa-user-plus"></i>SignUp</Link>
    </li>
    <li className="signin"> 
      <Link className="nav-link " to="/signin" style={isActive(history,'/signin')}>SignIn <i class="fa fa-sign-in" aria-hidden="true"></i></Link>
    </li>
    
         </React.Fragment>
    )}
    
    {isAuthenticated()&&(
     <React.Fragment>
    <span className="badge badge-success badge-pill signName">{isAuthenticated().user.name.substring(0,7)}</span>
       <li className="signout"> 
       <span className=" badge badge-danger badge-pill" onClick={()=>{
         SignOut(()=>{
           history.push('/')
         })
       }
       } style={{cursor:'pointer',color:'black'}}><i class="fa fa-sign-out" aria-hidden="true"></i> SignOut</span>
     </li>
     </React.Fragment>
    )}
    {isAuthenticated()&&isAuthenticated().user.role===0&&(
     <li> 
      <Link className="nav-link " to="/user/dashboard" style={isActive(history,'/user/dashboard')}>UserDashboard <FaUserCheck/></Link>
    </li>
    )}
    {isAuthenticated()&&isAuthenticated().user.role===1&&(
     <li> 
      <Link className="nav-link " to="/admin/dashboard" style={isActive(history,'/admin/dashboard')}>AdminDashboard</Link>
    </li>
    )}
   </ul> 
);
export default withRouter(Menu);
