/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {
  faPlusCircle, faLayerGroup, faLockOpen, faFolderOpen, faFile,
} from "@fortawesome/free-solid-svg-icons";

import "./PanelHeader.scss";
import SearchBox from "../search-box/SearchBox";

const PanelHeader = ({
  pageTitle, setPageNumbers, getRequests, handleSelect, handleSearch, searchQuery,
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
      <div className="search-container search-elements-responsive">
        <select name="name" id="id" className="select-search" onChange={handleSelect}>
          <option key="searchBy" value="">Search by</option>
          <option key="status" value="status">Status</option>
          <option key="request_type" value="request_type">Request type</option>
          <option key="reason" value="reason">Reason</option>
        </select>
        <SearchBox className="search" value={searchQuery} onChange={handleSearch} />
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
