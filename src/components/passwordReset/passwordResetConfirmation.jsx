import React, { Component } from "react";
import NavBar from "../navbar/navbar";
import "../form/form.scss";
import image from "../../assets/verify.png";

class verifyPasswordReset extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="card-container">
          <form className="card" onSubmit={this.handleSubmit}>
            <div className="title">Verify Email</div>
            <img className="margin" src={image} alt="" />
            <p className="text center">
              Password reset request successful.
              Click the Link on your email to reset your password.
            </p>
            <hr />
          </form>
        </div>
      </div>
    );
  }
}

export default verifyPasswordReset;
