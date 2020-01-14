import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import OpenJobs from "./open-jobs";
import CreateNew from "./create-new";

export default function JobRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/jobs" exact to="/jobs/openJobs" />
                <Route path="jobs/openJobs" component={OpenJobs} />
                <Route path="jobs/createNew" component={CreateNew} />
            </Switch></Router>
        </div>

    );
}
