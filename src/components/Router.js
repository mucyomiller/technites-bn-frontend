/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import VerifyEmailPage from "./register-page/VerifyEmail";
import Dashboard from "./dashboard/Dashboard";
import SingleRequest from "./single-request/SingleRequest";
import { RequestPage } from './request-page/RequestPage';

import {
  LandingPage,
  LoginPage,
  NotFound,
  Register,
  UserRequests,
  Profile,
  passwordReset,
  AdminRequests,
  verifyPasswordReset,
  PasswordChange,
} from "./index";

const Router = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={Register} />
    <Route path="/verify" component={VerifyEmailPage} />
    <Route path="/verify-password-reset" component={verifyPasswordReset} />
    <Route path="/reset-password" component={passwordReset} />
    <Route path="/password-change/:token" component={PasswordChange} />
    <Route path="/profile" component={Profile} />
    <ProtectedRoute path="/requests/request_id" component={UserRequests} />
    <Route path="/requests/:id" component={SingleRequest} />
    <ProtectedRoute path="/requests" component={UserRequests} />
    <ProtectedRoute path="/allRequests" component={AdminRequests} />
    <Route exact path="/" component={LandingPage} />
    <ProtectedRoute exact path="/dashboard" component={Profile} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
