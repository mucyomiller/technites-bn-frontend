/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import React from "react";
import "./input.scss";

const Input = ({ label, value, error, ...rest }) => {
  return (
    <div className="input-container">
      <div className="label">{label}</div>
      <input {...rest} className="input-field" value={value || ''} />
      {error && <div className="danger">{error}</div>}
    </div>
  );
};

export default Input;
