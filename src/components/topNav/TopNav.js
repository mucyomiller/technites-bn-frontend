import React from 'react';
import { Link } from 'react-router-dom';
import './TopNav.scss';
import logo from '../../assets/barefoot-logo1.png';

const TopNav = () => (
  <nav className="flex-parent">
    <ul className="flex-parent">
      <li>
        {' '}
        <Link to="/">
          <div id="logo">
            <img src={logo} alt="logo" />
          </div>
        </Link>{' '}
      </li>
    </ul>

    <ul className="flex-parent">
      <li>
        {' '}
        <Link to="/signup"> Sign Up </Link>{' '}
      </li>{' '}
      |
      <li>
        {' '}
        <Link to="/login"> Login </Link>{' '}
      </li>
    </ul>
  </nav>
);

export default TopNav;
