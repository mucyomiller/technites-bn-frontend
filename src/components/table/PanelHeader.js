/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faPlusCircle, faLayerGroup, faLockOpen, faFolderOpen, faSearch, faFile,
} from "@fortawesome/free-solid-svg-icons";

import "./PanelHeader.scss";

const PanelHeader = ({
  pageTitle, setPageNumbers, getRequests,
}) => {
  const handleChange = (e) => {
    setPageNumbers(e.target.value);
  };
  return (
    <div className="panel-header">
      <div className="page-info">
        <h1 className="page-title">{pageTitle}</h1>
        <h4 className="sub-title">
          {" "}
          <span className="sub-title-info">
            <a href="#">Dashboard </a>
          </span>
                /
          <span className="sub-title-info">
            <a href="#">
              {" "}
              {pageTitle}
            </a>
          </span>
        </h4>
      </div>
      <div className="panel-commands">
        <button className="transparent-button first-button" type="button" title="New Request">
          <FontAwesomeIcon className="panel-icons" icon={faPlusCircle} />
          <span className="button-label">New Request</span>
        </button>
        <button className="transparent-button" type="button" title="All Request" onClick={() => getRequests("All")}>
          <FontAwesomeIcon className="panel-icons" icon={faLayerGroup} />
          <span className="button-label">All Requests</span>
        </button>
        <button className="transparent-button" type="button" onClick={() => getRequests("Pending")} title="Open Request">
          <FontAwesomeIcon className="panel-icons" icon={faLockOpen} />
          <span className="button-label">Open Requests</span>
        </button>
        <button className="transparent-button" type="button" onClick={() => getRequests("Past")} title="Past Request">
          <FontAwesomeIcon className="panel-icons" icon={faFolderOpen} />
          <span className="button-label">Past Requests</span>
        </button>
        <div className="transparent-button last-button page-number-div">
          <FontAwesomeIcon className="panel-icons" icon={faFile} />
          <span className="button-label">Change Rows </span>
          <select className="panel-page-number" onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option selected value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};
PanelHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  setPageNumbers: PropTypes.func.isRequired,
  getRequests: PropTypes.func.isRequired,
};
export default PanelHeader;
