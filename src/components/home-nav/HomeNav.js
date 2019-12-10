/* eslint-disable import/no-named-as-default */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./HomeNav.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLock, faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/barefoot_white.svg";
import messageIcon from "../../assets/message_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";
import avatarImg from "../../assets/avatar_img.png";
import { toggleNotPane } from "../../redux/actions/notificationActions";
import NotificationPane from "../notification/notificationPane";
import Chat from "../chat";
import { authLogout } from "../../services/authServices";

export const HomeNav = ({ user, toggleNotPaneHandler, notificationCounter }) => {
  const [isShown, setIsShown] = useState(false);
  const toggleMenu = () => {
    setIsShown(!isShown);
  }
  const logout = async () => {
    toggleMenu();
    await authLogout();
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  const showHideSideBar = () => {
    document.querySelector('.side-bar');
  }
  return (
    <div>
      <nav className="home-wrapper">
        <Link to="/" className="home-link">
          <img src={logo} alt="logo" />
        </Link>
        <div className="action-side">
        <img
          id="message-btn"
          src={messageIcon}
          className="icons clickable"
          alt="messages icons"
          onClick={() => {
            localStorage.setItem("showState", true);
            window.location.href = window.location.href;
          }}
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
          <div>
            <div className="profile-action" onClick={toggleMenu}>
              <div className="divider" />
              <h5 className="profile-name clickable m-l-5">{(user && user.firstname) || ""}</h5>
              <FontAwesomeIcon icon={faAngleDown} color="white" className="m-l-5 m-r-5" />
              <div className="avatar">
                <img
                  src={user && user.image_url ? user.image_url : avatarImg}
                  alt="profile"
                />
              </div>
            </div>
            <div id="main-pane" className={isShown ? 'main-modal block' : 'main-modal none'}>
              <div className="main-modal-content">
                <Link to="/profile"><FontAwesomeIcon icon={faUser} className="m-r-5" /> Profile</Link>
                <a href="#" onClick={logout}><FontAwesomeIcon icon={faLock} className="m-r-5" /> Logout</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <NotificationPane />
      <Chat />
    </div>
  )
};
const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
  displayNotPane: state.notifications.notPaneDisplay,
  notificationCounter: state.notifications.notificationCount,
});

const mapDispatchToProps = {
  toggleNotPaneHandler: toggleNotPane,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeNav);
