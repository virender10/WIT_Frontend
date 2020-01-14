import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import EditEvent from "./edit-event";
import NewEvent from "./new-event";

export default function StatusWellInformationRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/status" exact to="/status/editEvent" />
                <Route path="status/editEvent" component={EditEvent} />
                <Route path="status/newEvent" component={NewEvent} />
            </Switch></Router>
        </div>

    );
}
