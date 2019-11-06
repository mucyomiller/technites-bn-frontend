import React from "react";
import { a } from "react-router-dom";
import "./navbar.scss";

const NavBar = () => (
  <ul>
    <li>
      <a href="/" className="left">
        Logo here
      </a>
    </li>
    <li className="right">
      <a href="/register">Sign up </a>
    </li>
    <li className="right">
      <a href="/login">Login</a>
    </li>
  </ul>
);

export default NavBar;
