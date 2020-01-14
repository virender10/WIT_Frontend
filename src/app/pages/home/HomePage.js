import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import DashboardRoutes from "./dashboard/dashboardRoutes";
import WellInformationRoutes from "./well-information/wellInformationRoutes";
import StatusRoutes from "./status-events/statusRoutes";
import JobRoutes from "./jobs/jobsRoutes";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import RoleRoutes from './user-management/Roles/RoleRoutes';
import UserRoutes from './user-management/Users/UserManagementRoutes';
import CompanyRoutes from "./companies/CompaniesRoutes"
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
        <Route path="/dashboard" component={DashboardRoutes} />
        <Route path="/wellInformation" component={WellInformationRoutes} />
        <Route path="/status" component={StatusRoutes} />
        <Route path="/jobs" component={JobRoutes} />
        <Route path="/google-material" component={GoogleMaterialPage} />
        <Route path="/react-bootstrap" component={ReactBootstrapPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/user-management/Users" component={UserRoutes} />
        <Route path="/company" component={CompanyRoutes} />
        <Route path="/user-management/Roles" component={RoleRoutes} />
        <Route path="/admin-management/" component={AdminProfile}/>
        <Route path="/data-management/UserForm" component={DataRoutes}/>
        <Redirect to="/error/error-v6" />
      </Switch>
    </Suspense>
  );
}
