import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import MainForm from "./UserForm/mainView";

export default function DataRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/data-management/UserForm" exact to="/data-management/UserForm/MainForm" />
                <Route path="/data-management/UserForm/MainForm" component={MainForm} />
            </Switch></Router>
        </div>

    );
}
