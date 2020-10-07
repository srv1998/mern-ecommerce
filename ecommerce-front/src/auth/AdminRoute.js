import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated} from "./index";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated()&&isAuthenticated().user.role===1 ? (
                <Component {...props} />
            ) : isAuthenticated()&&isAuthenticated().user.role===0?(<Redirect to={{
                pathname: "/",
                state: { from: props.location }
            }}></Redirect>):(
                <Redirect
                    to={{
                        pathname: "/signin",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;
