import React, { Component } from 'react';
import { connect } from "react-redux";
import LoginForm from '../login-page/LoginForm';

export class LandingPage extends Component {
  componentDidMount () {
    if(this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <header className="header">
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src="video/video.mp4" type="video/mp4" />
            <source src="video/video.webm" type="video/webm" />
            Your browser is not supported!
          </video>
        </div>
        <div className="row">
          <div className="col-2-of-3--landingpage header--left-side">
            <div className="header__text-box">
              <h1 className="heading">
                <span className="heading--main">barefoot</span>
                <span className="heading--sub">
                  easy & convinient company travel
                </span>
              </h1>
            </div>
          </div>
          <div className="col-1-of-3--landingpage header--right-side">
            <LoginForm />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = ({ loginState }) => ({
  isAuthenticated: loginState.isAuthenticated
});

export default connect(mapStateToProps)(LandingPage);
