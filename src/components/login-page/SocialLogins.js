/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from "react";
import { heroku } from "../../services/httpServices";

export class SocialLogin extends Component {
  componentDidMount() {}

  gmailLogin = () => {
    window.location.replace(`${heroku}/auth/google`);
  };

  facebookLogin = () => {
    window.location.replace(`${heroku}/auth/facebook`);
  };

  render() {
    return (
      <>
        <div className="socialMediaButtons">
          <button
            className="socialMedia mr-20 facebook"
            type="button"
            onClick={this.facebookLogin}
          />
          {" "}
          <button
            type="button"
            onClick={this.gmailLogin}
            className="socialMedia  mr-20 gmail"
          >
            {" "}
          </button>
        </div>
      </>
    );
  }
}

export default SocialLogin;
