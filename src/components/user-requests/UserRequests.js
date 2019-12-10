/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
/* eslint-disable arrow-parens */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { getUserRequests } from "../../redux/actions/RequestActions";
import { retrieveProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";

import { Table } from "../table";
import SideBar from "../side-bar";
import Footer from "../footer";
import PanelHeader from "../table/PanelHeader";
import "../search-box/SearchBox.scss";
import { Link } from 'react-router-dom';

export class UserRequests extends Component {
  constructor() {
    super();
    this.state = {
      requestFound: false,
      requests: [],
      errors: {},
      postsPerPage: 4,
      currentPage: 1,
      user: {},
      searchQuery: "",
      filtered: [],
      searchBy: "",
    };
  }

  componentDidMount() {
    this.props.getUserRequests("All");
    this.props.retrieveProfile();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ requests, errors, user }) {
    if (user.role_value === 0) {
      window.location.href = "/dashboard";
    }
    this.setState({ errors, requests, user });
    if (errors) {
      toast.error(errors.message ? errors.message : errors, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSelect = (input) => {
    this.setState({ searchBy: input.target.value });
  }

  render() {
    const columns = [
      "Reason",
      "Departure Date",
      "Request Type",
      "Requested on",
      "Status",
      "Actions",
    ];

    const { searchQuery } = this.state;
    const { requests } = this.props.requests;
    const { searchBy } = this.state;

    // search by status
    let filtered = requests;
    if (searchQuery && (searchBy !== "")) {
      filtered = requests.filter(r => r[searchBy].toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      filtered = requests;
    }

    const { user } = this.props;
    // Get current posts
    const indexOfLastElement = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstElement = indexOfLastElement - this.state.postsPerPage;
    const currentElements = filtered.slice(
      indexOfFirstElement,
      indexOfLastElement,
    );

    // Change page
    const paginate = (currentPage) => this.setState({ currentPage });
    const setPageNumbers = (postsPerPage) => this.setState({ postsPerPage });

    const edit = (
      <a href="#">Edit</a>
    );
    const elements = currentElements.map((request) => (
      <tr className="table-row" key={request.id}>
        <td className="table-element" id={request.id}>
          {(
            <p
              className="comment-content"
              dangerouslySetInnerHTML={{
                __html: request.reason.replace(
                  /(<? *script)/gi,
                  "illegalscript",
                ),
              }}
            />
          )}
        </td>
        <td className="table-element" id={request.id}>
          {request.departure_date.substring(0, 10)}
        </td>
        <td className="table-element" id={request.id}>
          {request.request_type}
        </td>
        <td className="table-element" id={request.id}>
          {moment(request.createdAt).fromNow()}
        </td>
        <td className="table-element" id={request.id}>
          {request.status}
          <span className={`${request.status.toLowerCase()}-dot`} />
        </td>
        <td className="table-element">
          <div className="actions-dropdown">
            <button type="button" className="drop-btn">
              Actions
            </button>
            <div className="dropdown-content">
              {request.status === "Pending" ? edit : null}
              <Link to={`/requests/${request.id}`}>View more</Link>
            </div>
          </div>
        </td>
      </tr>
    ));
    return (
      <>
        <HomeNav user={user} />
        <SideBar userRole={user.role_value} />
        <PanelHeader
          pageTitle="My Requests"
          setPageNumbers={setPageNumbers}
          getRequests={this.props.getUserRequests}
          handleSelect={this.handleSelect}
          handleSearch={this.handleSearch}
          searchQuery={searchQuery}
        />

        <br />
        <Table
          columns={columns}
          elements={elements}
          postsPerPage={this.state.postsPerPage}
          totalPosts={requests.length}
          paginate={paginate}
          currentPageNumber={this.state.currentPage}
        />
        <Footer />
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  requests: state.Requests,
  searchRequests: state.searchRequests,
  errors: state.errors,
  user: state.profile.user,
});

export default connect(mapStateToProps, { getUserRequests, retrieveProfile })(UserRequests);
