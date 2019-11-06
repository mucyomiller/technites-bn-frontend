import React from "react";
import PropTypes from "prop-types";
import "./close-icon-button.scss";

const CloseIconButton = ({ onClose }) => (
  <button data-test="component-close-icon" onClick={onClose} type="button" className="close-button">
      &times;
  </button>
);

CloseIconButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CloseIconButton;
