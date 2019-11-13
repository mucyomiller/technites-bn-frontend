import React, { Component } from "react";
import NavBar from "../navbar/navbar";
import "../form/form.scss";
import image from "../../assets/verify.png";

class VerifyEmailPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="card-container">
          <form className="card" onSubmit={this.handleSubmit}>
            <div className="title">Verify Email</div>
            <img className="margin" src={image} alt="" />
            <p className="text">
              You are almost ready to start enjoying Barefoot Nomad, Just verify
              your email using the link we sent you!
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default VerifyEmailPage;
