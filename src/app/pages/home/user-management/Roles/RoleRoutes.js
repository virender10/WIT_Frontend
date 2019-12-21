import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import RoleList from '../Roles/RoleList';
import CreateRole from '../Roles/CreateRole';

export default function UserRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/user-management" exact to="/user-management/Users/UserList" />
                <Route path="/user-management/Roles/RoleList" component={RoleList} />
                <Route path="/user-management/Roles/CreateRole" component={CreateRole} />
            </Switch></Router>
        </div>

    );
}
