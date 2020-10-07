import React ,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getUser ,updateUser,updateJWT} from './auth';
import { Redirect } from 'react-router-dom';
const UserUpdate=(props)=>{
   const [values,setValues]=useState({
       name:'',
       password:'',
       password2:'',
       email:'',
       about:'',
       phone:'',
       error:false,
       success:false
   })

  const {name,password,email,about,phone,error,success,password2}=values 
  const {token}=isAuthenticated();
  const userId=props.match.params.userId;
  const init=()=>{
      getUser(userId,token)
      .then(data=>{
          if(data.error)
          {
              setValues({...values,error:data.error})
          }
          else{
            setValues({
                ...values,
                name:data.name,
                phone:data.phone,
                email:data.email,
               
                about:data.about
               
            })
          }
      })
  }
  const handleChange=value=>e=>{
      setValues({...values,[value]:e.target.value})
  }

  const updateProfile=(e)=>{
    e.preventDefault()
    if(password=='')
    {
      updateUser(userId,token,{name,email,about,phone})
      .then(data=>{
          if(data.error)
          {
              setValues({...values,error:data.error})
          }
          else{
              updateJWT(data,()=>{
                  setValues({
                      ...values,
                      name:data.name,
                      email:data.email,
                      about:data.about,
                      phone:data.phone,
                      success:true
                  })
              })
          }
      })
    }
    else if(password!=password2)
    {
        setValues({...values,error:'password did not match!!'})
    }
    else{
    updateUser(userId,token,{name,email,password,about,phone})
    .then(data=>{
        if(data.error)
        {
            setValues({...values,error:data.error})
        }
        else{
            updateJWT(data,()=>{
                setValues({
                    ...values,
                    name:data.name,
                    email:data.email,
                   
                    about:data.about,
                    phone:data.phone,
                    success:true
                })
            })
        }
    })}}
    const showError=()=>(
        <div className='alert alert-danger' style={{display:error?'':'none'}}>
          {error}
        </div>
     )
    const redirectUser=()=>{
        if(success)
         {
             return(
                 <Redirect to="/user/dashboard"></Redirect>
             )
         }
    }
  const updateForm=()=>(
      
      <form onSubmit={updateProfile} className="updateUserForm mb-3">
          <div className="form-group">
            <label >Name</label>
            <input type="text" className="form-control" name="name" value={name} onChange={handleChange('name')} />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={handleChange('password')} />
          </div>
          <div className="form-group">
            <label >Confirm Password</label>
            <input type="password" className="form-control" name="password2" value={password2} onChange={handleChange('password2')} />
          </div>
          <div className="form-group">
            <label >E-Mail</label>
            <input type="text" className="form-control" name="email" value={email} onChange={handleChange('email')} readOnly/>
          </div>
          <div className="form-group">
            <label >About</label>
            <textarea className="form-control" name="about" value={about} onChange={handleChange('about')}></textarea>
          </div>
          <div className="form-group">
          <label >Phone</label>
            <input type="Number" className="form-control" name="about" value={phone} onChange={handleChange('phone')}/>
          </div>
          <button type="submit" className="btn btn-success">update</button>
      </form>
  )
  useEffect(()=>{
      init()
  },[])

    return(
        <div className="updateUser">
        <Layout title="Profile" description="Update Profile !!!" className="container">
          <h2 style={{textAlign:'center',color:'red'}}>Update profile</h2>
          {showError()}
          {updateForm()}
           {redirectUser()}
        </Layout>
        </div>
    );
}


export default UserUpdate