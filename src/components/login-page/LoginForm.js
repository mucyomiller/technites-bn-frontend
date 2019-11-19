/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import "../form/form.scss";
import Form from "../form/form";
import SocialLogins from "./SocialLogins";
import { loginUser } from "../../redux/actions/loginAction";

export class LoginForm extends Form {
  doSubmit = () => {
    this.props.loginUser(this.state.data);
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };

  render() {
    return (
      <div className="card-container center">
        <form className="card" onSubmit={this.handleSubmit}>
          <div className="title">Login</div>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
          <p className="login-alt">
            <span>or</span>
          </p>
          <SocialLogins />
          <p>
            Forgot password?
            <Link to="/reset-password"> Reset </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default connect(null, { loginUser })(LoginForm);
