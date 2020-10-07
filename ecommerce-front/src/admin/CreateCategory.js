import React, { useState } from 'react';
import {isAuthenticated} from '../auth/index';
import Layout from '../core/Layout';
import {createCategory} from './auth';
import {Link} from 'react-router-dom'

const CreateCategory=()=>{
      const [name,setName]=useState('');
      const [error,setError]=useState(false);
      const [success,setSuccess]=useState(false);
     const {user,token}=isAuthenticated();
      const handleChange=(e)=>{
          setName(e.target.value);
          setError(false);
      }

      const showSuccess=()=>(
          <div className='alert-info' style={{display:success?'':'none'}}>
           {`Catgory  has been successfully created!!!`}
          </div>
      )
      const showError=()=>(
        <div className='alert-danger' style={{display:error?'':'none'}}>
        category already exists!!!
       </div>
      )
      const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" style={{color:'red'}}>
                Back to Dashboard
            </Link>
        </div>
    );
      const handleSubmit=(e)=>{
          e.preventDefault();
          
          createCategory(user._id,{name},token)
          .then(data=>{
              if(data.error)
                {
                    setSuccess(false);
                    setError(true);
                }
                else{
                    setName('');
                    setSuccess(true);
                }
          })

      }
       const categoryForm=()=>(
        <form onSubmit={handleSubmit} className="catForm">
        <div className='form-group'>
            <label >Create Category</label>
            <input type='text' name='category' required className='form-control' onChange={handleChange}/>
        </div>
        <button className='btn btn-success'>submit</button>
        </form>
       )
    return(
        <div style={{backgroundColor:' rgba(128, 128, 128, 0.384)'}}>
        <Layout title="Create Category" description="welcome to Create Category Page" className="container col-md-8 offset-md-2">
        {showError()}
        {showSuccess()}  
        <h2 style={{ background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,1))',textAlign:'center',margin:'20px'}}>Enter Category Name</h2>  
        {categoryForm()}
        {goBack()}
       </Layout>
       </div>
    )
       
}
export default CreateCategory;