import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import VerifyEmailPage from "./register-page/VerifyEmail";
import Dashboard from "../components/dashboard/Dashboard";
import {
  LandingPage, LoginPage, NotFound, Register, UserRequests,
} from "./index";

const Router = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={Register} />
    <Route path="/verify" component={VerifyEmailPage} />
    <ProtectedRoute path="/requests" component={UserRequests} />
    <Route exact path="/" component={LandingPage} />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
