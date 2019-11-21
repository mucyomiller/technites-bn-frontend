/* eslint-disable camelcase */
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
import { getMyUsersRequests } from "../../redux/actions/RequestActions";
import { retrieveProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";
import { Table } from "../table";
import SideBar from "../side-bar";
import Footer from "../footer";
import Modal from "../shared/modal/Modal";
import "../../styles/modal.scss";
import PanelHeader from "../table/PanelHeader";

export class AdminRequests extends Component {
  constructor() {
    super();
    this.state = {
      requestFound: false,
      requests: [],
      errors: {},
      postsPerPage: 4,
      currentPage: 1,
      user: {},
    };
  }

  componentDidMount() {
    this.props.getMyUsersRequests("All");
    this.props.retrieveProfile();
  }

  UNSAFE_componentWillReceiveProps({ requests, errors, user }) {
    if (user.role_value < 4) {
      window.location.href = "/dashboard";
    }
    this.setState({ errors, requests, user });
    if (errors) {
      toast.error(errors.message ? errors.message : errors, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  render() {
    const columns = [
      "Avatar",
      "Requester",
      "Reason",
      "Departure Date",
      "Request Type",
      "Requested on",
      "Status",
      "Actions",
    ];

    const { requests } = this.props.requests;
    const { user } = this.props;
    // Get current posts
    const indexOfLastElement = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstElement = indexOfLastElement - this.state.postsPerPage;
    const currentElements = requests.slice(
      indexOfFirstElement,
      indexOfLastElement
    );
    // Change page
    const paginate = currentPage => this.setState({ currentPage });
    const setPageNumbers = postsPerPage => this.setState({ postsPerPage });

    const elements = currentElements.map(request => (
      <tr className="table-row" key={request.id}>
        <td className="table-element" id={request.id}>
          <img
            className="user-avatar"
            src={request.User.image_url}
            alt={`${request.User.firstname} ${request.User.lastname}`}
          />
          <div className="tooltip">
            <span>Email: {request.User.email}</span>
            <br />
            <span>Phone: {request.User.phone}</span>
            <br />
            <span>Gender: {request.User.gender}</span>
            <br />
            <span>Address: {request.User.address}</span>
            <br />
            <span>Country: {request.User.country}</span>
            <br />
            <span>Language: {request.User.language}</span>
            <br />
            <span>Company: {request.User.company}</span>
            <br />
            <span>Department: {request.User.department}</span>
            <br />
          </div>
        </td>
        <td className="table-element" id={request.id}>
          {`${request.User.firstname} ${request.User.lastname}`}
        </td>
        <td className="table-element" id={request.id}>
          {request.reason.substring(0, 12)}
        </td>
        <td className="table-element" id={request.id}>
          {request.departure_date.substring(0, 10)}
        </td>
        <td className="table-element" id={request.id}>
          {request.request_type}
        </td>
        <td className="table-element" id={request.id}>
          {request.createdAt.substring(0, 10)}
        </td>
        <td className="table-element" id={request.id}>
          {request.status}
          <span className={`${request.status.toLowerCase()}-dot`} />
        </td>
        <td className="table-element">
          <div
            className={
              request.status === "Pending"
                ? "actions-dropdown"
                : "actions-dropdown-disabled"
            }
          >
            <button type="button" className="drop-btn">
              Actions
            </button>
            <div className="dropdown-content">
              <Modal
                triggerText="Approve"
                data={request}
                action="approve"
                status="Approved"
              />
              <Modal
                triggerText="Reject"
                data={request}
                action="reject"
                status="Rejected"
              />
            </div>
          </div>
        </td>
      </tr>
    ));
    return (
      <>
        <HomeNav user={user} />
        <SideBar />
        <PanelHeader
          pageTitle="All Requests"
          setPageNumbers={setPageNumbers}
          getRequests={this.props.getMyUsersRequests}
        />
        <Table
          columns={columns}
          elements={elements}
          postsPerPage={this.state.postsPerPage.toString()}
          totalPosts={requests.length}
          paginate={paginate}
          currentPageNumber={this.state.currentPage}
        />
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => ({
  requests: state.Requests,
  errors: state.errors,
  user: state.profile.user,
});
export default connect(mapStateToProps, {
  getMyUsersRequests,
  retrieveProfile,
})(AdminRequests);
