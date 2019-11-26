/* eslint-disable react/prop-types */
import React from "react";

const Counter = ({ animation, count }) => (
  <div className={`counter ${animation}`}>
    {count === 1 ? <p>{`${count} city`}</p> : <p>{`city ${count}`}</p>}
  </div>
);

export default Counter;
