import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import UserList from "../Users/UserList";
import CreateUser from "../Users/CreateUser";

export default function UserRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/user-management" exact to="/user-management/Users/UserList" />
                <Route path="/user-management/Users/UserList" component={UserList} />
                <Route path="/user-management/Users/CreateUser/:id?" component={CreateUser} />
            </Switch></Router>
        </div>

    );
}
