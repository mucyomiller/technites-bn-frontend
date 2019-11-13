/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Form from "../form/form";
import { register } from "../../redux/actions/registerAction";
import NavBar from "../navbar/navbar";

export class Register extends Form {
  doSubmit = async () => {
    this.props.register(this.state.data);
  };

  schema = {
    firstname: Joi.string()
      .required()
      .min(3)
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .min(3)
      .label("Last Name"),
    username: Joi.string()
      .required()
      .min(3)
      .label("Username"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    confirmPassword: Joi.string()
      .required()
      .min(6)
      .label("Confirm Password")
  };

  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="card-container">
          <div className="card">
            <div className="title">Create an account</div>
            {this.renderInput("firstname", "First Name")}
            {this.renderInput("lastname", "Last Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput(
              "confirmPassword",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Sign up", "register")}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ register }) => ({
  users: register
});

export default connect(mapStateToProps, { register })(Register);
