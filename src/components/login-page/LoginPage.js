import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import LoginForm from "./LoginForm";
import NavBar from "../navbar/navbar";
import { getJwt } from "../../services/authServices";
import Dashboard from "../dashboard/Dashboard";
import "./login.scss";

export const LoginPage = ({ location, isAuthenticated }) => {
  const url = location.search;

  const userData = queryString.parse(url);

  return getJwt() || isAuthenticated ? (
    <Dashboard />
  ) : (
    <>
      <NavBar />
      <div>
        <LoginForm socialAuth={userData} />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.loginState.isAuthenticated
  };
};

export default connect(mapStateToProps)(LoginPage);
