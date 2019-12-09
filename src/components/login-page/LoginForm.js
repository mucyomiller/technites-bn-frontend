/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable quotes */
import React from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import '../form/form.scss';
import Form from '../form/form';
import SocialLogins from './SocialLogins';
import { loginUser } from '../../redux/actions/loginAction';

export class LoginForm extends Form {
  doSubmit = () => {
    this.props.loginUser(this.state.data);
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label('Email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password')
  };

  render() {
    return (
      <div className="container">
        <div className="card-container header__login-card">
          <div className="card card--login">
            <div className="title">Login</div>
            {this.renderInput('email', 'Email')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login', 'login')}
            <p>
              Forgot password?
              <a href="/reset-password"> Reset </a>
            </p>
            <p className="login-alt">
              <span>or</span>
            </p>
            <SocialLogins />
            <p>
              Don't have an account
              <a href="/register"> Register </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { loginUser })(LoginForm);
