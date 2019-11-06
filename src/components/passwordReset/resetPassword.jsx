/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React from "react";
import { connect } from "react-redux";
import Joi from "joi-browser";
import "../form/form.scss";
import Form from "../form/form";
import { passWordChangeAction } from "../../redux/actions/passwordResetAction";

export class PasswordChange extends Form {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.passWordChangeAction(this.state.data, this.props.match.params.token);
  };

  schema = {
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    confirm_password: Joi.string()
      .required()
      .min(6)
      .label("Confirm Password")
  };

  render() {
    return (
      <div className="card-container center">
        <form className="card center password-reset" onSubmit={this.handleSubmit}>
          <div className="title">Password Reset</div>
          <p className="ps-test">Enter a new password</p>
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("confirm_password", "Confirm Password", "password")}
          {this.renderButton("Reset Password")}
        </form>
      </div>
    );
  }
}

export default connect(null, { passWordChangeAction })(PasswordChange);
