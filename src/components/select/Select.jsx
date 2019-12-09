/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";

const Select = ({
  name,
  label,
  options,
  error,
  type = "text",
  myRequest,
  ...rest
}) => {
  return (
    <div className="selector">
      <label htmlFor={name}>{label}</label>
      {type === "date" ? (
        <input
          {...rest}
          type={type}
          name={name}
          disabled={myRequest ? false : true}
          className={myRequest ? "select" : "select-remove-arrow"}
        />
      ) : (
        <select
          name={name}
          id={name}
          {...rest}
          disabled={myRequest ? false : true}
          className={myRequest ? "select" : "select-remove-arrow"}
        >
          {options.map(option => (
            <option key={option.name} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      )}
      {error && <div className="danger">{error}</div>}
    </div>
  );
};

export default Select;
