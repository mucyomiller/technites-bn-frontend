import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LandingPage, LoginPage, NotFound } from './index';

const Router = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/login" component={LoginPage} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
