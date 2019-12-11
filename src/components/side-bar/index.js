import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faList,
  faBus,
  faUserPlus,
  faHotel,
  faCog,
  faUser,
  faBars
} from "@fortawesome/free-solid-svg-icons";
const SideBar = ({ userRole }) => {
  const [showHideSideBar, setShowHideSideBar] = useState(false);
  const screenWidth = window.screen.width;
  const closeSideBarMobile = () => {
    if (screenWidth < 500) {
      setShowHideSideBar(false);
    }
  };
  useEffect(() => {
    if (screenWidth > 500) {
      setShowHideSideBar(true);
    }
  }, []);

  return (
    <>
      <FontAwesomeIcon
        className="side-bar-hamburger"
        icon={faBars}
        onClick={() => setShowHideSideBar(!showHideSideBar)}
      />
      {showHideSideBar ? (
        <div className="side-bar">
          <ul className="main-nav">
            {userRole !== 0 ? (
              <>
                <li className="nav-header">DASHBOARD</li>
                <li className="nav-item" onClick={() => closeSideBarMobile()}>
                  <a href="/dashboard">
                    <FontAwesomeIcon className="sidebar-icons" icon={faBus} />
                    My Dashboard
                  </a>
                </li>
                <li className="nav-header">REQUESTS</li>
                <li
                  id="new-request"
                  className="nav-item"
                  onClick={() => closeSideBarMobile()}
                >
                  <a href="/requests/new">
                    <FontAwesomeIcon className="sidebar-icons" icon={faBus} />
                    Make Request
                  </a>
                </li>
                <li
                  id="all-request"
                  className="nav-item"
                  onClick={() => closeSideBarMobile()}
                >
                  <a href={userRole < 4 ? "/requests" : "/allrequests"}>
                    <FontAwesomeIcon className="sidebar-icons" icon={faList} />
                    View Requests
                  </a>
                </li>
              </>
            ) : null}
            {userRole === 7 ? (
              <>
                <li className="nav-header">HOSTS</li>
                <li
                  id="add-host"
                  className="nav-item"
                  onClick={() => closeSideBarMobile()}
                >
                  <a href="/addhost">
                    <FontAwesomeIcon
                      className="sidebar-icons"
                      icon={faUserPlus}
                    />
                    Add Host
                  </a>
                </li>
                <li className="nav-header">ROLES</li>
                <li
                  id="change-roles"
                  className="nav-item"
                  onClick={() => closeSideBarMobile()}
                >
                  <a href="/role">
                    <FontAwesomeIcon className="sidebar-icons" icon={faCog} />
                    Assign Roles
                  </a>
                </li>
              </>
            ) : null}
            <li className="nav-header">ACCOMMODATIONS</li>
            {userRole === 0 ? (
              <>
                <li className="nav-item" onClick={() => closeSideBarMobile()}>
                  <Link to="/accommodations/new">
                    <FontAwesomeIcon className="sidebar-icons" icon={faHotel} />
                    Add Accommodation
                  </Link>
                </li>
                <li
                  id="new-room"
                  className="nav-item"
                  onClick={() => closeSideBarMobile()}
                >
                  <a href="/rooms/new">
                    <FontAwesomeIcon className="sidebar-icons" icon={faHotel} />
                    Add Room
                  </a>
                </li>
              </>
            ) : null}
            <li
              id="view-accommodation"
              className="nav-item"
              onClick={() => closeSideBarMobile()}
            >
              <a href="/accommodations">
                <FontAwesomeIcon className="sidebar-icons" icon={faList} />
                View All Accommodations
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  userRole: state.profile.user.role_value,
});

export default connect(mapStateToProps, null)(SideBar);