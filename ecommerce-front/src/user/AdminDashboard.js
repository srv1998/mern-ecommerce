import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';

const AdminDashboard=()=>{
     const {user}=isAuthenticated();
    const adminLinks=()=>(
        <div className="card  col-3" className="adminCard">
            <h4 className="card-header">Admin Accessibles</h4>
            <ul className="list-group mb-4">
             <li className="list-group-item">
                <Link to='/create/category' className="nav-link">Create category</Link>
             </li>
             <li className="list-group-item">
                <Link to='/create/product' className="nav-link">create product</Link>
             </li>
             <li className="list-group-item">
                <Link to='/orders/list' className="nav-link">list orders</Link>
             </li>
             <li className="list-group-item">
                <Link to='/manageProducts' className="nav-link">manage products</Link>
             </li>
            </ul>

        </div>
    )
   const adminInfo=()=>(
    <div className="card mb-5 col-9 adminInfo">
    <h3 className="card-header">Admin Info <img src="/images/admin.png" style={{float:'right'}} ></img></h3>   
    <ul className="list-group mb-5 " style={{background:'lightgray'}} >
     <li className="list-group-item " style={{background:'lightgray'}}>{user.name}</li>
     <li className="list-group-item" style={{background:'lightgray'}}>{user.email}</li>
     <li className="list-group-item" style={{background:'lightgray'}}>{user.role==1?'Admin':'Authenticated User'}</li>
     <li className="list-group-item" style={{background:'lightgray'}}>{user.about}</li>
     
    </ul>
   </div> 
   )
  
   
   return (
     <div style={{background:'rgba(128, 128, 128, 0.384)'}}>
     <Layout title='Admin Dashboard'description={`welcome ${user.name} to Dashboard`}  className="container">
         <div className="row">
             <div className="col-9">
                 {adminInfo()}
                 
             </div>
             <div className="col-3">
                 {adminLinks()}
             </div>
         </div>  
        </Layout>
        </div>
);

   
}
export default AdminDashboard;