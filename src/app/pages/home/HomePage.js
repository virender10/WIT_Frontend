import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import RoleRoutes from './user-management/Roles/RoleRoutes';
import UserRoutes from './user-management/Users/UserManagementRoutes';
import AdminProfile from "./admin-management/adminProfile";
import DataRoutes from "./data-management/DataRoutes";

const GoogleMaterialPage = lazy(() =>
  import("./google-material/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./react-bootstrap/ReactBootstrapPage")
);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/builder" component={Builder} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/user-management/Users" component={UserRoutes} />
        <Route path="/user-management/Roles" component={RoleRoutes} />
        <Route path="/admin-management/" component={AdminProfile}/>
        <Route path="/data-management/UserForm" component={DataRoutes}/>
        <Redirect to="/error/error-v6" />
      </Switch>
    </Suspense>
  );
}
