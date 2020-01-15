import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import CompanyList from "./CompanyList";
import CreateCompany from "./CreateCompany";

export default function CompanyRoutes() {
    return (
        <div className="kt-portlet kt-portlet--height-fluid">
            <Router><Switch>
                <Redirect from="/company" exact to="/company/create" />
                <Route path="/company/companyList" component={CompanyList} />
                <Route path="/company/create/:id?" component={CreateCompany} />
            </Switch></Router>
        </div>

    );
}
