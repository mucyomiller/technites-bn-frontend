/* eslint-disable import/no-named-as-default */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./HomeNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/barefoot_white.svg";
import messageIcon from "../../assets/message_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";
import arrowDown from "../../assets/arrow_down.svg";
import avatarImg from "../../assets/avatar_img.png";
import { toggleNotPane } from "../../redux/actions/notificationActions";
import NotificationPane from "../notification/notificationPane";

const HomeNav = ({ user, toggleNotPaneHandler, notificationCounter }) => (
  <>
    <nav className="home-wrapper">
      <FontAwesomeIcon className="hamburger-menu" icon={faBars} />
      <Link to="/" className="home-link">
        <img src={logo} alt="logo" />
      </Link>
      <div className="action-side">
        <img
          src={messageIcon}
          className="icons clickable"
          alt="messages icons"
        />
        <div className="notification">
          <img
            src={notificationIcon}
            className="icons clickable"
            alt="notification icon"
            onClick={toggleNotPaneHandler}
          />
          <span id="badger" className="badge">{notificationCounter || ""}</span>
        </div>
        <div className="profile-action">
          <div className="divider" />
          <h5 className="profile-name clickable">{(user && user.firstname) || ""}</h5>
          <img src={arrowDown} className="icons clickable" alt="arrowDown" />
          <div className="avatar">
            <img
              src={user && user.image_url ? user.image_url : avatarImg}
              alt="profile"
            />
          </div>
        </div>
      </div>
    </nav>
    <NotificationPane />
  </>
);
const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  displayNotPane: state.notifications.notPaneDisplay,
  notificationCounter: state.notifications.notificationCount,
});

const mapDispatchToProps = {
  toggleNotPaneHandler: toggleNotPane,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
