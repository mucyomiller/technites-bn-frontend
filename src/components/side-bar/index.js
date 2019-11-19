import React from "react";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faBus } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => (
  <>
    <div className="side-bar">
      <ul className="main-nav">
        <li className="nav-header">Requests</li>
        <li className="nav-item">
          <a href="/requests">
            <FontAwesomeIcon className="sidebar-icons" icon={faBus} />
            Make Request
          </a>
        </li>
        <li className="nav-item">
          <a href="/allrequests">
            <FontAwesomeIcon className="sidebar-icons" icon={faList} />
            View All Requests
          </a>
        </li>
      </ul>
    </div>
  </>
);
export default SideBar;
