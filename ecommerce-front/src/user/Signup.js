import React,{useState} from 'react';
import Layout from '../core/Layout'
import {Link} from 'react-router-dom';
import {SignUp} from '../auth';
import  '../style1.css'
import { FaUnderline } from 'react-icons/fa';

const Signup=()=>{
   const [values,setValues]=useState({
                                     name:'',
                                     email:'',
                                     password:'',
                                     phone:'',
                                     gender:'',
                                     day:'',
                                     month:' ',
                                     year:'',

                                     error:'',
                                     success:false
                                   })
  const handleChange=value=>e=>(
  	  setValues({...values,error:false,[value]:e.target.value})
  	);  
  const {name,email,password,password2,phone,day,month,year,gender}=values;
  const {error,success}=values;

const showError=()=>(
	   <div className='alert alert-danger' style={{display:error?'':'none'}}>
	     <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>{error}
	   </div>
	)
const showSuccess=()=>(
	   <div className='alert alert-info' style={{display:success?'':'none'}}>
	     New Account is Created ..please <Link to='/signin'>SignIn</Link> 
	   </div>
	)	
  
  

  const handleClick=(e)=>{
    e.preventDefault();
    if(password!=password2)
    {
      setValues({ ...values, error:'password did not match or not filled!!' })
    }
       else {setValues({ ...values, error: false });
        SignUp({ name, email, password,phone,gender,day,month,year }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    password2:'',
                    error: '',
                    phone:'',
                    gender:'',
                    day:'',
                    month:'',
                    year:'',
                    success: true
                });
            }
        });}
  }
  const signupForm=()=>(

     <form className="supForm mb-3">
      <div className="form-header">
      <h2 style={{ textAlign:'center',margin:'20px'}} className="text-danger">Registration Form</h2>
        </div> 
     <div className="form-group ">
         <label>Name</label>
         <input type="text" name="name"  required className="form-control" onChange={handleChange('name')} value={name}/> 
     </div>
     <div className="form-group">
         <label >E-mail</label>
         <input type="email" name="email"  required className="form-control"  onChange={handleChange('email')} value={email} placeholder="abc@xyz.com"/> 
     </div>
      <div className="form-group">
         <label >Password</label>
         <input type="password" name="Password" required className="form-control"  onChange={handleChange('password')} value={password}/> 
     </div>
     <div className="form-group">
         <label >Confirm-Password</label>
         <input type="password" name="Password" required className="form-control"  onChange={handleChange('password2')} value={password2}/> 
     </div>
     <div className="form-group mt-4">
       <label>Date of Birth: </label><span> </span>
         <label >Day</label><span> </span>
         <input type="Number" name="day"    onChange={handleChange('day')} value={day} /> 
         <span> </span>
         <span> </span>
         <label >Month</label>
         <span> </span>
         <select onChange={handleChange('month')} >
        
           <option value="january" key={0}>January</option>
           <option value="febraury" key={1}>Febraury</option>
           <option value="march" key={2}>March</option>
           <option value="april" key={3}>April</option>
           <option value="may" key={4}>May</option>
           <option value="june" key={5}>June</option>
           <option value="july" key={6}>July</option>
           <option value="august" key={7}>August</option>
           <option value="september" key={8}>September</option>
           <option value="october" key={9}>October</option>
           <option value="november" key={10}>November</option>
           <option value="december" key={11}>December</option>
         </select>
         <span> </span>
         <label >Year</label><span> </span>
         <input type="Number" name="year"    onChange={handleChange('year')} value={year} /> 
         </div>
     
     <div className="form-group">
         <label >Gender:</label><span> </span>
         <input type="radio" name="gender"  required  onChange={handleChange('gender')} value='male' /> <label>Male</label><span> </span>
         <input type="radio" name="gender"  required onChange={handleChange('gender')} value='female' /> <label>Female</label> 
     </div>
     <div className="form-group">
         <label >Phone No.</label>
         <input type="Number" name="Phone" required className="form-control"  onChange={handleChange('phone')} value={phone} placeholder='enter 10 digit number'/> 
     </div>
      <button type="submit" className="btn btn-success" onClick={handleClick} style={{marginLeft:'200px',width:'400px'}}>Submit</button>
      <Link to="/"  className="ml-5 " style={{color:'red',float:"right",textDecoration:'underline'}}>Cancel</Link>
     </form>
  	)
  
	return(
        <div style={{background:'darkcyan'}}>
	      <Layout title="Sign Up" description="welcome to SignUp Page" className="container col-md-8 offset-md-2">
	       {showError()}
           {showSuccess()}
           
	       {signupForm()}
	      </Layout>
        </div>
	);
}

export default Signup;