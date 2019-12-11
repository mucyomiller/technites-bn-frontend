import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import LoginForm from './LoginForm';
import { getJwt } from '../../services/authServices';
import { socialAuthAction } from '../../redux/actions/socialAuthAction';
import './login.scss';

export const LoginPage = ({
  isAuthenticated,
  socialAuthAction: socialAuth
}) => {
  const history = useHistory();
  const location = useLocation();
  const isAuth = getJwt() || isAuthenticated;
  const url = location.search;

  const userData = queryString.parse(url);
  if (userData.status === 'ok') {
    socialAuth(userData);
  }

  useLayoutEffect(() => {
    if (isAuth) {
      history.push('/dashboard');
    }
  }, [isAuth]);

  return (
    <div className="container">
      <div className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="video/video.mp4" type="video/mp4" />
          <source src="video/video.webm" type="video/webm" />
          Your browser is not supported!
        </video>
      </div>
      <div>
        <LoginForm socialAuth={userData} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  socialAuthAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.loginState.isAuthenticated
});

export default connect(mapStateToProps, { socialAuthAction })(LoginPage);
