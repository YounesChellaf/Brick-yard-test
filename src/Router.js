import React from "react"
import {BrowserRouter,Route, Switch} from "react-router-dom"
import {history} from "./history";
import Login from "./views/auth/Login";
import SearchVihecule from "./views/home/SearchVihecule"
import Error from  "./views/misc/Error"
import {ProtectedRoute} from "./Helpers/protected.route"

class Router extends React.Component{
    render() {
        return (
            <BrowserRouter history={history}>
                <Switch>
                    <Route
                        path='/'
                        exact
                        component={ Login }
                    />
                    <ProtectedRoute
                        path='/home'
                        component={ SearchVihecule }
                    />
                    <Route
                        path='*'
                        component={Error}
                    />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Router