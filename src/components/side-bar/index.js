import React from "react";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList, faBus, faUserPlus, faHotel, faCog, faUser
} from "@fortawesome/free-solid-svg-icons";
const SideBar = ({ userRole }) => (
  <>
    <div className="side-bar">
      <ul className="main-nav">
        {userRole !== 0 ? (
          <>
          <li className="nav-header">DASHBOARD</li>
            <li className="nav-item">
              <a href="/dashboard">
                <FontAwesomeIcon className="sidebar-icons" icon={faBus} />
                My Dashboard
              </a>
            </li>
            <li className="nav-header">REQUESTS</li>
            <li className="nav-item">
              <a href="/requests/new">
                <FontAwesomeIcon className="sidebar-icons" icon={faBus} />
                Make Request
              </a>
            </li>
            <li className="nav-item">
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
            <li className="nav-item">
              <a href="/addhost">
                <FontAwesomeIcon className="sidebar-icons" icon={faUserPlus} />
                Add Host
              </a>
            </li>
            <li className="nav-header">ROLES</li>
            <li className="nav-item">
              <a href="/role">
                <FontAwesomeIcon className="sidebar-icons" icon={faCog} />
                Assign Roles
              </a>
            </li>
          </>
        ) : null}
        <li className="nav-header">ACCOMMODATIONS</li>
        {userRole !== 1 ? (
          <li className="nav-item">
            <a href="/accommodations/new">
              <FontAwesomeIcon className="sidebar-icons" icon={faHotel} />
              Create
            </a>
          </li>
        ) : null}
        <li className="nav-item">
          <a href="/accommodations">
            <FontAwesomeIcon className="sidebar-icons" icon={faList} />
            View All Accommodations
          </a>
        </li>
      </ul>
    </div>
  </>
);
export default SideBar;
