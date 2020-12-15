import React from "react"
import {Route,Redirect} from "react-router-dom"
import {isAuthenticated} from "../authService/Login"

// The protectedRoute as a middlware to protect the routes needed to be authenticated to have access
export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated()  ?
            <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location }}} />
    )} />
);