/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getJwt } from "../../services/authServices";

class ProtectedRoute extends Component {
  render() {
    const { isAuthenticated, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
  }
}

const mapStateToProps = ({ loginState }) => ({
  isAuthenticated: loginState.isAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);
