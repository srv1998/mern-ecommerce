import {API} from '../config';

export const SignUp=(user)=> (
     fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
        	    return response.json();
              })
        .catch(err =>console.log(err))
);
export const SignIn=(user)=> (
    fetch(`${API}/signin`, {
       method: 'POST',
       headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(user)
   })
       .then(response => {
               return response.json();
             })
       .catch(err =>console.log(err))
);
export const authenticate=(data,next)=>{
    if(typeof window !=undefined)
       {localStorage.setItem('jwt',JSON.stringify(data));
     next(); } 
}
export const SignOut=(next)=>{
    if(typeof window !=undefined)
    {localStorage.removeItem('jwt');
     next(); }
    fetch(`${API}/signout`,{
        method:"GET"
    }).then((response)=>console.log('Signed Out',response)).catch(err=>console.log(err));  
} 

export const isAuthenticated=()=>{  // to show nav links conditionaly..
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    } 

}

export const forgotPassword = email => {
    return fetch(`${API}/forgot-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const resetPassword = resetInfo => {
    return fetch(`${API}/reset-password`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const loginWithGoogle = user => {
    return fetch(`${API}/google-login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
