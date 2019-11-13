/* eslint-disable react/no-danger */
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
import { getUserRequests } from "../../redux/actions/RequestActions";
import { retrieveProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";
import { Table } from "../table";
import SideBar from "../side-bar";
import Footer from "../footer";
import PanelHeader from "../table/PanelHeader";

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
    };
  }

  componentDidMount() {
    this.props.getUserRequests("All");
    this.props.retrieveProfile();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ requests, errors, user }) {
    this.setState({ errors, requests, user });
    if (errors) {
      toast.error(errors.message ? errors.message : errors, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
    const { requests } = this.props.requests;
    const { user } = this.props;
    // Get current posts
    const indexOfLastElement = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstElement = indexOfLastElement - this.state.postsPerPage;
    const currentElements = requests.slice(
      indexOfFirstElement,
      indexOfLastElement,
    );
    // Change page
    const paginate = (currentPage) => this.setState({ currentPage });
    const setPageNumbers = postsPerPage => this.setState({ postsPerPage });

    const edit = (
      <a href="#">Edit</a>
    );
    const elements = currentElements.map((request) => (
      <tr className="table-row" key={request.id}>
        <td className="table-element" id={request.id}>
          {request.reason ? (
            <p
              className="comment-content"
              dangerouslySetInnerHTML={{
                __html: request.reason.replace(
                  /(<? *script)/gi,
                  "illegalscript",
                ),
              }}
            />
          ) : (
              "Fill your reason down there..."
            )}
        </td>
        <td className="table-element" id={request.id}>
          {request.departure_date}
        </td>
        <td className="table-element" id={request.id}>
          {request.request_type}
        </td>
        <td className="table-element" id={request.id}>
          {request.createdAt}
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
              <a href={`/requests/${request.id}`}>View more</a>
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
          pageTitle="My Requests"
          setPageNumbers={setPageNumbers}
          getRequests={this.props.getUserRequests}
        />
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
const mapStateToProps = (state) => ({
  requests: state.Requests,
  errors: state.errors,
  user: state.profile.user,
});
export default connect(mapStateToProps, { getUserRequests, retrieveProfile })(UserRequests);
