import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import EditHeader from "./edit-header";

export default function WellInformationRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/wellInformation" exact to="/wellInformation" />
                <Route path="wellInformation/editHeader" component={EditHeader} />
            </Switch></Router>
        </div>

    );
}
