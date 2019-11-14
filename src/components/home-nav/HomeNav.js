/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./HomeNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/barefoot_white.svg";
import messageIcon from "../../assets/message_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";
import arrowDown from "../../assets/arrow_down.svg";
import avatarImg from "../../assets/avatar_img.png";

const HomeNav = ({ user }) => (
  <nav className="home-wrapper">
    <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
    <Link to="/" className="home-link">
      <img src={logo} alt="logo" />
    </Link>
    <div className="action-side">
      <img src={messageIcon} className="icons clickable" alt="messages icons" />
      <img src={notificationIcon} className="icons clickable" alt="notification icon" />
      <div className="profile-action">
        <div className="divider" />
        <h5 className="profile-name clickable">
          {user.firstname || ""}
        </h5>
        <img src={arrowDown} className="icons clickable" alt="arrowDown" />
        <div className="avatar">
          <img src={user.image_url ? user.image_url : avatarImg} alt="profile" />
        </div>
      </div>
    </div>
  </nav>
);
export default HomeNav;
