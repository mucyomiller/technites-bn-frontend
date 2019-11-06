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
import "./passwordReset.scss";
import { passWordResetAction } from "../../redux/actions/passwordResetAction";

export class PassReset extends Form {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.passWordResetAction(this.state.data);
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email")
  };

  render() {
    return (
      <div className="card-container center ">
        <form
          data-test="pass-reset-form-email"
          className="card center password-reset"
          onSubmit={this.handleSubmit}
        >
          <div className="title">Password Reset</div>
          <hr />
          <p className="text ps-test">
            Please enter your email to search for your account.
          </p>
          {this.renderInput("email", "Email")}
          <br />
          {this.renderButton("Reset Password")}
        </form>
      </div>
    );
  }
}

export default connect(null, { passWordResetAction })(PassReset);
