import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {getHistory} from './auth'
import moment from 'moment'

const UserDashboard=()=>{
     const [history,setHistory]=useState([]) //history array refers to orders array..1 history= 1 order
   
     const {user,token}=isAuthenticated();
    const userLinks=()=>(
        <div className="card userLinks">
            <h4 className="card-header" style={{color:'rgba(255, 255, 255, 0.781)'}}>User Accessibles</h4>
            <ul className="list-group" style={{background:'grey'}}>
             <li className="list-group-item">
                <Link to='/cart' className="nav-link">Cart</Link>
             </li>
             <li className="list-group-item">
                <Link to={`/update/${user._id}`} className="nav-link">password & profile update</Link>
             </li>
             <li className="list-group-item">
                <Link to={`/wish-list`} className="nav-link">Wish List</Link>
             </li>
            </ul>

        </div>
    )
const init=()=>{
    getHistory(user._id,token)
    .then(data=>{
        if(data.error)
        {
            console.log(data.error)
        }
        else{
            setHistory(data)
        }
    })
}
useEffect(()=>{
    init()
},[])
   const userInfo=()=>(
    <div className="card mb-5 col-9 userInfo">
    <h3 className="card-header"  style={{color:'rgba(255, 255, 255, 0.781)'}}>User Info <img src="/images/user.png" style={{float:'right'}}></img></h3>   
    <ul className="list-group">
     <li className="list-group-item">{user.name}</li>
     <li className="list-group-item">{user.email}</li>
     <li className="list-group-item">{user.role==1?'Admin':'Authenticated User'}</li>
     <li className="list-group-item">{user.about}</li>
     <li className="list-group-item">{user.phone}</li>
    </ul>
   </div> 
   )
  const userHistory=()=>(<div className="card mb-5 userHistory">
  <h3 className="card-header"  style={{color:'rgba(255, 255, 255, 0.781)'}}>Purchase history</h3>
  <ul className="list-group">
      <li className="list-group-item">
          {history.map((h, i) => {
              return (
                  <div>
                      <hr />
                      {h.products.map((p, i) => {
                          return (
                              <div key={i}>
                                  <h6>Product name: {p.name}</h6>
                                  <h6>Product price: ${p.price}</h6>
                                  <h6>
                                      Purchased date:{" "}
                                      {moment(h.createdAt).fromNow()}
                                  </h6>
                              </div>
                          );
                      })}
                  </div>
              );
          })}
      </li>
  </ul>
</div>
  )
   
   return (
   <div style={{background:'  rgba(128, 128, 128, 0.384)'}}>
   <Layout title='User Dashboard'description={`welcome ${user.name} to Dashboard`}  className="container">
         <div className="row">
             <div className="col-9">
                 {userInfo()}
                 {userHistory()}
             </div>
             <div className="col-3">
                 {userLinks()}
             </div>
         </div>  
        </Layout>
        </div>
);

   
}
export default UserDashboard;