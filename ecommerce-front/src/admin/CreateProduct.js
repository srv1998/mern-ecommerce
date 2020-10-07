import React, { useState,useEffect } from 'react';
import {isAuthenticated} from '../auth/index';
import Layout from '../core/Layout';
import {createProduct,getCategories} from './auth';
import {Link} from 'react-router-dom'
import Loading from '../core/Loading'

const CreateProduct=()=>
{
    const {user,token}=isAuthenticated();
    const [values,setValues]=useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        success:'',
        productCreated:'',
        redirect:false,
        formData:'',
        shipping:''
    })
  const {name,
  description,
  price,
  categories,
  category,
  quantity,
  loading,
  error,
  success,
  productCreated,
  redirect,
  formData,  // to send d data entereed in the form of Form..
  shipping}=values;
const init=()=>{
   getCategories().then(data=>{
     if(data.error)
     {
       setValues({...values,error:data.error})
     }
     else{
       setValues({...values,categories:data,formData:new FormData()})
     }
   })
}

 useEffect(()=>{
   init()
 },[]) // only trigger when page mounts for the first time.

 const showError=()=>(
   <div className="alert-danger" style={{display:error?'':'none',textAlign:'center'}}>
     {error}
   </div>
 )
 const showSuccess=()=>(
  <div className="alert-info" style={{display:success?'':'none',textAlign:'center'}}>
   {productCreated} has been Created successfully!!!
  </div>
)
const showLoading =()=>(loading&&(<Loading/>))

  const handleChange=name=>e=>{
    let value= name==='photo'?e.target.files[0]:e.target.value;
    formData.set(name,value);
    setValues({...values,[name]:value});
  }
const submitForm=(e)=>{
   e.preventDefault();
   setValues({...values,error:'',loading:true})
   createProduct(user._id,formData,token)
   .then(data=>{
     if(data.error)
     {
       setValues({...values,error:data.error,loading:false});
     }
     else{
       setValues({
         ...values,
         name:'',
         description:'',
         price:'',
         photo:'',
         loading:false,
         error:false,
         success:true,
         quantity:'',
         productCreated:data.name
       })
     }
   })
}

 const productForm=()=>(
    <form className='mb-3 createProduct' onSubmit={submitForm} >
      <h4>Upload Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label >Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label >Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label >Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label >Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option >Please select</option>
                    {categories&&categories.map((c,i)=><option key={i} value={c._id}>{c.name}</option>)} 
                </select>
            </div>

            <div className="form-group">
                <label >Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label >Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-danger">Create Product</button>
    </form>
 )

   return(
     <div style={{background:'rgba(128, 128, 128, 0.384)'}}>
    <Layout title="Create Product" description="welcome to Create Product Page" className="container col-md-8 offset-md-2">
        {showError()}
        {showLoading()}
        {showSuccess()}
        <div className='row'>
           <div className='col-md-8 offset-md-2'> 
               {productForm()}
           </div>
        </div>
       </Layout>
       </div>
   );
}
export default CreateProduct;