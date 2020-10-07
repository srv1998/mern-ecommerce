import {API} from '../config';

export const getUser=(userId,token)=>(
    fetch(`${API}/user/${userId}`,{
        method:"GET",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        }
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const updateUser=(userId,token,updatedUser)=>(
    fetch(`${API}/user/update/${userId}`,{
        method:"PUT",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        },
        body:JSON.stringify(updatedUser)
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const updateJWT=(updatedUser,next)=>{
    let localuser;
    if(typeof window!=undefined)
    {
        if(localStorage.getItem('jwt'))
        {
           localuser=JSON.parse(localStorage.getItem('jwt'))
           localuser.user=updatedUser;
           localStorage.setItem('jwt',JSON.stringify(localuser))
        }
        next()
    }
}
export const getHistory=(userId,token)=>(
    fetch(`${API}/user/history/${userId}`,{
        method:"GET",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        }
    }).then(response=>response.json()).catch(err=>console.log(err))
)