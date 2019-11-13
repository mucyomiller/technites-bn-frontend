/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authServices";

const ProtectedRoute = ({ path, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!getCurrentUser()) {
        return <Redirect to="/login" />;
      }
      return <Component {...props} />;
    }}
  />
);

export default ProtectedRoute;
