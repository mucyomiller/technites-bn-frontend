import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
// eslint-disable-next-line import/no-named-as-default
import LoginForm from "./LoginForm";
import NavBar from "../navbar/navbar";
import { getJwt } from "../../services/authServices";
import Profile from "../profile-page/ProfilePage";
import { socialAuthAction } from "../../redux/actions/socialAuthAction";
import "./login.scss";

export const LoginPage = ({ location, isAuthenticated, socialAuthAction }) => {
  const url = location.search;

  const userData = queryString.parse(url);
  if (userData.status === "ok") {
    socialAuthAction(userData);
  }

  return getJwt() || isAuthenticated ? (
    <Profile /> // do redirect instead of this.
  ) : (
    <div className="container">
      <NavBar />
      <div>
        <LoginForm socialAuth={userData} />
      </div>
    </div>
  );
};

LoginPage.protoType = {};
const mapStateToProps = (state) => ({
  isAuthenticated: state.loginState.isAuthenticated,
});

export default connect(mapStateToProps, { socialAuthAction })(LoginPage);
