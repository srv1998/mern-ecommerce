import React,{useState} from 'react';
import Layout from '../core/Layout';
import { Redirect,Link } from 'react-router-dom';
import {SignIn,authenticate,isAuthenticated} from '../auth';
import LoginGoogle from '../core/LoginGoogle'
import '../style1.css'; 
import Loading from '../core/Loading'

const Signin=()=>{
    const [values,setValues]=useState({
		email:'',
		password:'',
		error:'',
		loading:false,
		redirect:false
	})
      const  {user}=isAuthenticated();
const {email,password,error,loading,redirect}=values;
const showError=()=>(
	<div className="alert alert-danger" style={{display:error?'':'none'}}>
		<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>{error}
	</div>
)
const showLoading=()=>(
	loading&&(<Loading></Loading>)
	
)
const redirectUser=()=>{
	if(redirect)
	{
		if(user&&user.role==0)
        return <Redirect to='/user/dashboard'></Redirect>
		else
		return <Redirect to='/admin/dashboard'></Redirect>
	}
}
const handleChange=value=>e=>(
	setValues({...values,error:false,[value]:e.target.value})
)
const handleClick=(e)=>{
	e.preventDefault();
	setValues({...values,error:false,loading:true})
	SignIn({email,password})
	.then(data=>{
		if(data.error)
		   setValues({...values,error:data.error,loading:false})
		   else{
			   authenticate(data,()=>{
				setValues({
					...values,
					redirect:true 
			   })
				
			   })
		   }
	})
}

 const SignInForm=()=>(
  <form className="sinForm ">
	 <LoginGoogle></LoginGoogle> 
     <div className="form-group">
     <label >E-Mail</label>
     <input type="text" className="form-control" name="email" onChange={handleChange('email')}/ >
     </div>
	 <div className="form-group">
     <label >Password</label>
     <input type="password" className="form-control" name="password" onChange={handleChange('password')}/ >
     </div>
	 <button className="btn-primary" onClick={handleClick} disabled={loading}>{loading&&(<i className="fa fa-refresh fa-spin" />)} submit</button>
	 <Link to="/forgot-password/page"><button className="btn-danger ml-3" >forgot password?</button></Link>
  </form>
 	)
 
 return(
	<div style={{background:'darkcyan'}}>
	 <Layout title="Sign In" description="welcome to Signin Page" className="container col-md-8 offset-md-2">
	 <div className="signin">		 
	  {showError()}
	  {showLoading()}
	  {SignInForm()}
	  {redirectUser()}
	  </div>
	  </Layout>
	  </div>
	)
}
export default Signin;