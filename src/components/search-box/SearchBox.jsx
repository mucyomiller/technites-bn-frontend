/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import React from "react";
import "./SearchBox.scss";

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        className="search"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
