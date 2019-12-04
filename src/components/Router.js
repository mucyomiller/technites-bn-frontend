/* eslint-disable import/no-named-as-default */
import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import VerifyEmailPage from "./register-page/VerifyEmail";

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
  AddHost,
  HostReset,
  RoleSettings,
  SingleRequest,
  AccommodationsPage,
  AnAccommodationPage,
  AddAccommodation,
  AddRoom,
  Dashboard,
} from "./index";

const Router = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={Register} />
    <Route path="/verify" component={VerifyEmailPage} />
    <Route path="/verify-password-reset" component={verifyPasswordReset} />
    <Route path="/reset-password" component={passwordReset} />
    <Route path="/password-change/:token" component={PasswordChange} />
    <ProtectedRoute path="/profile" component={Profile} />
    <ProtectedRoute path="/requests/:id" component={SingleRequest} />
    <Route exact path="/" component={LandingPage} />
    <Route path="/requests/:id" component={SingleRequest} />
    <Route path="/host/reset" component={HostReset} />
    <ProtectedRoute path="/accommodations/new" component={AddAccommodation} />
    <ProtectedRoute path="/rooms/new" component={AddRoom} />
    <ProtectedRoute path="/requests/request_id" component={UserRequests} />
    <ProtectedRoute path="/requests" component={UserRequests} />
    <ProtectedRoute path="/allRequests/:id" component={SingleRequest} />
    <ProtectedRoute path="/allRequests" component={AdminRequests} />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
    <ProtectedRoute path="/addhost" component={AddHost} />
    <ProtectedRoute path="/role" component={RoleSettings} />
    <ProtectedRoute exact path="/accommodations/new" component={NotFound} />
    <ProtectedRoute path="/accommodations/:acc_id" component={AnAccommodationPage} />
    <ProtectedRoute path="/accommodations" component={AccommodationsPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
