/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleNotPane, markOneRead } from "../../redux/actions/notificationActions";

export const SingleNotification = ({
  requestId, message, toggleNotDisplay, notId, markThisRead,
}) => (
  <li>
    <Link
      data-test="single-notification"
      onClick={() => {
        markThisRead(notId);
        toggleNotDisplay();
      }}
      to={`/requests/${requestId}/`}
    >
      {message}
    </Link>
    <hr />
  </li>
);

const mapDispatchToProps = {
  toggleNotDisplay: toggleNotPane,
  markThisRead: markOneRead,
};
SingleNotification.propTypes = {
  message: PropTypes.string.isRequired,
  requestId: PropTypes.number.isRequired,
  notId: PropTypes.number.isRequired,
  toggleNotDisplay: PropTypes.func.isRequired,
  markThisRead: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SingleNotification);
