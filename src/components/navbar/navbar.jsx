import React from "react";
import logo from "../../assets/barefoot_white.svg";
import "./navbar.scss";

const NavBar = () => (
  <div className="center-icon">
    <img src={logo} alt="logo" className="nav-logo" />{" "}
  </div>
);

export default NavBar;
