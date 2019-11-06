import React from "react";
import "./navbar.scss";

const NavBar = () => (
  <ul>
    <li>
      <a className="left" href="#home">
        Logo here
      </a>
    </li>
    <li className="right">
      <a href="#about">Sign up</a>
    </li>
    <li className="right">
      <a href="#about">Login</a>
    </li>
  </ul>
);

export default NavBar;
