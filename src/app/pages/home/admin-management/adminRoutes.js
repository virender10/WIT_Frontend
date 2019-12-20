import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import AdminProfile from '../admin-profile-management/adminProfile';

export default function UserRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/admin-profile-management" exact to="/admin-profile-management/adminProfile" />
                <Route path="/admin-profile-management/adminProfile" component={AdminProfile} />
                {/* <Route path="/user-management/Users/CreateUser/:id?" component={CreateUser} /> */}
            </Switch></Router>
        </div>

    );
}
