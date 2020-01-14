import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import WellSelection from "./well-selection";
import Dashboard from "./index";

export default function DashboardRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="dashboard/wellSelection" component={WellSelection} />
            </Switch></Router>
        </div>

    );
}
