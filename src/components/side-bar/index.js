import React from "react";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList, faBus, faUserPlus, faHotel, faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"

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
        {userRole === 0 ? (
          <>
          <li className="nav-item">
            <Link to="/accommodations/new" >
              <FontAwesomeIcon className="sidebar-icons" icon={faHotel} />
              Add Accommodation
            </Link>
          </li>
          <li className="nav-item">
            <a href="/rooms/new">
              <FontAwesomeIcon className="sidebar-icons" icon={faHotel} />
              Add Room
            </a>
          </li>
          </>
        ) : null}
        <li className="nav-item">
          <Link to="/accommodations">
            <FontAwesomeIcon className="sidebar-icons" icon={faList} />
            View Accommodations
          </Link>
        </li>
      </ul>
    </div>
  </>
);
export default SideBar;
