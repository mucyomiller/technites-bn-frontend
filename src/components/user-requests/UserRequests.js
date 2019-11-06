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
import { getUserRequests } from "../../redux/actions/UserRequestActions";

import { Table } from "../table";

export class UserRequests extends Component {
  constructor() {
    super();
    this.state = {
      requestFound: false,
      requests: [],
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getUserRequests();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps({ requests, errors }) {
    this.setState({ errors, requests });
    if (errors.error && typeof errors.error !== "object") {
      toast.error(errors.error, {
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
    const elements = requests.map((request) => (
      <tr className="table-row" key={request.id}>
        <td className="table-element" id={request.id}>
          {request.reason}
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
          <button type="button" className="accept-request-btn">
            Edit
            {" "}
          </button>
        </td>
      </tr>
    ));
    return (
      <>
        <h1>Requests</h1>
        <Table columns={columns} elements={elements} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  requests: state.userRequests,
  errors: state.errors,
});
export default connect(mapStateToProps, { getUserRequests })(UserRequests);
