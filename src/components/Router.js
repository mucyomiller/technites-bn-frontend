import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import VerifyEmailPage from "./register-page/VerifyEmail";
import {
  LandingPage, LoginPage, NotFound, Register,
} from "./index";

const Router = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={LandingPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={Register} />
    <Route path="/verify" component={VerifyEmailPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
