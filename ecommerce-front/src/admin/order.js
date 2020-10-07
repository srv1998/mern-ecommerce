import React ,{useState,useEffect}from 'react';
import Layout from '../core/Layout';
import {getAllOrders,getStatusValues,updateStatus,deleteOrder} from '../admin/auth';
import moment from 'moment'
import {isAuthenticated} from '../auth'

const Order=()=>{
    const [orders,setOrders]=useState([])
    const [status,setStatus]=useState([])

    const {user,token} =isAuthenticated()
   const handleOrders=()=>{
       getAllOrders(user._id,token)
       .then(data=>{
           if(data.error)
           {
               console.log(data.error);
               
           }
           else{
               setOrders(data)
           }
       })
   }
   const handleStatus=()=>{
    getStatusValues(user._id,token)
    .then(data=>{
        if(data.error)
        {
            console.log(data.error);
            
        }
        else{
            setStatus(data)
        }
    })
}

   useEffect(()=>{
       handleOrders()
       handleStatus()
   },[])

   const handleStatusChange=(oid,e)=>{
       updateStatus(user._id,token,oid,e.target.value)
       .then(data=>{
           if(data.error)
           {
               console.log(data.error)
           }
           else{
               handleOrders()
           }
       })
   }
const showStatus=(order)=>(
    <div className="form-group">
     <h4 className="mark mb-4">Status: {order.status}</h4>
     <select className="form-control" onChange={(e)=>handleStatusChange(order._id,e)}>
      <option>Select status</option>
       {status.map((s,i)=>(<option key={i} value={s}>{s}</option>))}
     </select>
    </div>
)

   const showOrdersLength=()=>{
       if(orders.length>0)
      {
      return <h3 className=" display-2 mb-4 text-danger" style={{textAlign:'center',fontWeight:'bold'}} >{orders.length} orders are present</h3>
      }
       else
       return <h1 className="text-danger display-2 " style={{textAlign:'center',fontWeight:'bold'}}>No Orders Sorry!</h1>
   }

   const getInput=(title,value)=>(
       <div className="input-group mb-1" style={{padding:'10px'}}>
          <div className="input-group-prepend">
             <div className="input-group-text">{title}</div>
          </div>
          <input type="text" value={value} className="form-control" readOnly/>
       </div>
   )
   const handleDelete=(OrderID)=>{
        deleteOrder(user._id,token,OrderID).
        then(response=>{
            if(response.error)
            {
                console.log(response.error)
            }
            else{
                handleOrders()
                handleStatus()
            }
        })
   }
   return(
       <div style={{background:'rgba(128, 128, 128, 0.384)'}}>
    <Layout title="Ordrers List" description="Orders from Users are as Below" className="container">
       {showOrdersLength()}
       <div className="row">
       <div className="col-md-8 offset-md-2">
        {orders.map((order,ind)=>(
            <div className="mb-5 orderForm"  key={ind}>
                <ul className="list-group " type='none' style={{ background: 'rgb(134, 96, 45)'}}>
                 <h4 className="list-header" style={{color:'lightyellow',textAlign:'center'}}>OrderID: {order._id} <button className="badge badge-danger badge-pill" style={{float:'right',border:'0.5px red solid'}} onClick={()=>handleDelete(order._id)}>Delete</button></h4>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item ">
                   {showStatus(order)}
                 </li>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item">
                   Amount: {order.amount}$
                 </li>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item">
                    TransactionID: {order.transactionID}
                 </li>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item">
                   OrderedBy: {order.user.name}
                 </li>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item">
                   OrderedOn: {moment(order.createdAt).fromNow()}
                 </li>
                 <li style={{borderBottom:'0.5px solid lightgrey'}} className="list-group-item">
                   Delivery Adress: {order.address}
                 </li>
                </ul>
                <div className="mt-2">
                 <h3 className=" font-italic" >Total Products in Order: {order.products.length}</h3>
                 {order.products.map((p,i)=>(
                     <div className="form-group" style={{borderBottom:'1px solid black'}} key={i}>
                         {getInput('product name',p.name)}
                         {getInput('product price',p.price)}
                         {getInput('product Total',p.count)}
                         {getInput('product Id',p._id)}
                     </div>
                 ))}
                 
                 
                </div>
            </div>
        )
        )}
       </div>
       </div>
    </Layout>
    </div>
   );
}

export default Order;