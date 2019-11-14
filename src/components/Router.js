import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import VerifyEmailPage from "./register-page/VerifyEmail";
import {
  LandingPage, LoginPage, NotFound, Register, UserRequests, Profile, AdminRequests,
} from "./index";

const Router = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={Register} />
    <Route path="/verify" component={VerifyEmailPage} />
    <ProtectedRoute path="/requests" component={UserRequests} />
    <ProtectedRoute path="/allRequests" component={AdminRequests} />
    <Route exact path="/" component={LandingPage} />
    <ProtectedRoute exact path="/dashboard" component={Profile} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
