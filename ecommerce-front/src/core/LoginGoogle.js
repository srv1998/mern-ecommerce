import {Link, Redirect,withRouter} from 'react-router-dom';
import React,{ useState, useEffect } from 'react';

import GoogleLogin from 'react-google-login';
import { loginWithGoogle, authenticate, isAuthenticated } from '../auth';


const LoginGoogle = ({history}) => {
    const responseGoogle = response => {
         console.log(response);
        const tokenId = response.tokenId;
        const user = { tokenId };

        loginWithGoogle(user).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                authenticate(data, () => {
                    if (isAuthenticated() && isAuthenticated().role === 1) {
                        history.push('/admin/dashboard')
                    } else {
                        history.push('/user/dashboard')
                    }
                });
            }
        });
    };

    return (
        <div className="pb-3">
           
            <GoogleLogin
                clientId='1087016811714-l52riif5mfod74pash2g0j9i111nbnbd.apps.googleusercontent.com'
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme="dark"
            />
        </div>
    );
};

export default withRouter(LoginGoogle);
