/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ type, label }) => (
  <button type={type} className="action-button">
    {label}
  </button>
);
Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default Button;
