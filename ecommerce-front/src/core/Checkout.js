import React ,{useState,useEffect}from 'react';

import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'
import {getBraintreeToken,processPayment} from './auth'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './CartStorage'
import { createOrder } from './auth';
import Loading from './Loading'
import {countries} from './Countries'
const Checkout=({products,run=undefined, setRun = f => f})=>{
  const [data,setData]=useState({
      braintreeToken:null,
      success:false,
      error:false,
      instance:{},
      address:'',
      loading:false,
      name:'',
      phone:'',
      house:'',
      street:'',
      city:'',
      state:'',
      country:'',
      pin:''
  })
   
    const userId= isAuthenticated() && isAuthenticated().user._id;
    const token=isAuthenticated().token;
    const {name,
    phone,
    house,
    street,
    city,
    state,
    country,
    pin}=data
const getTotal=()=>(
    products.reduce((cv,nv)=>(cv+nv.count*nv.price),0)
)
    const handleToken=()=>{
        getBraintreeToken(userId,token)
        .then(response=>{
            if(response.error)
            {
                console.log(data.error)
            }
            else{
                setData({braintreeToken:response.clientToken})
            }
        })
    }
    const buyProduct=()=>{
        setData({...data,loading:true})
        let nonce;  // to keep card info(cart type, payment method etc..)
        let getNonce= data.instance.requestPaymentMethod()
        .then(response=>{
           nonce=response.nonce
          let paymentData={
               nonce:nonce,
               amount:getTotal()
           }
          processPayment(userId,token,paymentData)
            .then(result=>{
                if(result.error)
                {
                    console.log(result.error)
                }
                else{
                  console.log(result)
                  let orderData={
                      products:products,
                      transcationID:result.transaction._id,
                      amount:result.transaction.amount,
                      address:data.address
                    }
                  createOrder(userId,token,orderData) // to store order details in Order model...
                  .then(datas=>{
                      if(datas.error)
                      {
                        setData({...data,loading:false})
                        setData({...data,success:false})
                      }
                      else{
                        
                        emptyCart()
                        setData({...data,loading:false})
                        setData({...data,success:true})
                        setRun(!run)
                        
                      }
                  })

                   
                }
            })
        }).catch(err=>{
            
            setData({...data,error:err.message})
            setData({...data,loading:false})
        })
    }
  const showError=()=>(
      <div className="alert alert-danger" style={{display:data.error?'':'none'}}>
         {data.error}
      </div>
  )
  const showLoading =()=>(data.loading&&(<Loading/>))
  const showSuccess=()=>(
      <div className="alert alert-info" style={{display:data.success?'':'none'}}>
       Your transcation was successfully!!
      </div>
  )
  const setAddress=()=>{
      console.log(name+phone+house+street+city+state+country+pin)
     data.address=''+name+','+phone+','+house+','+street+','+city+','+state+','+country+','+pin;
  }
  const addressForm=()=>(
     <form onBlur={setAddress}>
         <div className="form-group">
             <label className="text-dark">Name</label>
             <input type="text" name="name"  onChange={handleAddress('name')} value={name} className="form-control" required></input>
         </div>
         <div className="form-group">
             <label className="text-dark">Phone no.</label>
             <input type="text" name="phone"  onChange={handleAddress('phone')} value={phone} className="form-control" required></input>
         </div>
         <div className="form-group">
             <label className="text-dark">Flat/House no./Building</label>
             <input type="text" name="house" onChange={handleAddress('house')} value={house} className="form-control" required></input>
         </div>
         <div className="form-group">
             <label className="text-dark">Area/Colony/Street/</label>
             <input type="text" name="street"  onChange={handleAddress('street')} value={street} className="form-control" required></input>
         </div>
         <div className="form-group">
             <label className="text-dark">Town/City</label>
             <input type="text" name="city"  onChange={handleAddress('city')} className="form-control" value={city} required></input>
         </div>
         <div className="form-group">
             <label className="text-dark">State</label>
             <input type="text" name="state"  onChange={handleAddress('state')} className="form-control" value={state} required></input>
         </div>
         <div className="form-group">
             <select onChange={handleAddress('country')} className="form-control"  required>
               <option>select country</option>  
               {countries.map((c,i)=>(<option value={c} key={i}>{c}</option>))}
             </select>
         </div>
         <div className="form-group">
             <label className="text-dark">Postal/Zip code</label>
             <input type="text" name="pin"  onChange={handleAddress('pin')} className="form-control" required></input>
         </div>
     </form>
  )
   const showDropIn=()=>(
      <div onBlur={() => setData({ ...data, error: '' })}> 
       {data.braintreeToken!==null && products.length>0?(
           <div >
               <h3>Enter Your Adress details</h3>
                {addressForm()}
                <h3>Please Checkout</h3>
               <DropIn options={{
                   authorization:data.braintreeToken,
                  
               }} onInstance={instance=>data.instance=instance}/>
                <button className="btn btn-success" onClick={buyProduct} disabled={data.loading}>
            {data.loading&&(<i className="fa fa-refresh fa-spin" />)}Pay Bill</button>
           </div>
          
       ):null}
    </div>
   ) 
   const handleAddress=name=>e=>{
      
    //    if(data.prev==name)
    //       data.current=e.target.value
    //    else  
    //      {
    //          data.temp+=name+':'+data.current+","
    //          data.current=''
    //     }
    //    data.prev=name  
    //   if(name==='pin') 
    //      setData({...data,address:data.temp})

    setData({...data,[name]:e.target.value})


   }
   useEffect(()=>{
      
       handleToken()
   },[])
      return (
         <div>
             <h3 style={{color:'red'}}>Total Amount: {getTotal()}$</h3>
             {showSuccess()}
             {showError()}
             {showLoading()}
             <div className="mt-3">
             {isAuthenticated()?(
                 <div>{showDropIn()}</div>
             ):(
                <Link to="/signin"><button className="btn btn-primary" >SignIn to Checkout</button></Link>  
             )}
             </div>
         </div>
      )
} 

export default Checkout;