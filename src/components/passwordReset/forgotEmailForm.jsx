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
import image from "../../assets/verify.png";
import { passWordResetAction } from "../../redux/actions/passwordResetAction";

export class PassReset extends Form {
  doSubmit = () => {
    this.props.passWordResetAction(this.state.data);
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email")
  };

  render() {
    if (this.props.displayVerifyConfirmation === false)
      return (
        <React.Fragment>
          <div className="card-container center ">
            <div
              data-test="pass-reset-form-email"
              className="card center password-reset"
            >
              <div className="title">Password Reset</div>
              <hr />
              <p className="text ps-test">
                Please enter your email to search for your account.
              </p>
              {this.renderInput("email", "Email")}
              <br />
              {this.renderButton("Reset Password", "email_forgot")}
              <p><a href="/">Back to Sign In?</a></p><br /><br />
            </div>
          </div>
        </React.Fragment>
      );
    return (
      <div className="card-container" data-test="success-component">
        <form className="card" onSubmit={this.handleSubmit}>
          <div className="title">Verify Email</div>
          <img className="margin" src={image} alt="" />
          <p className="text center">
            Password reset request successful. Close this tab and click the Link
            on your email to reset your password.
          </p>
          <hr />
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  displayVerifyConfirmation: state.passwordReset.displayVerify
});

export default connect(mapStateToProps, { passWordResetAction })(PassReset);
