import React from "react";
import "./NotFound.scss";
const NotFound = () => {
  return(
  <div className="not-found">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/technites/image/upload/v1576057077/404-drib23_jqgo6v.gif"
    />
    <span className="return-home" onClick={() => window.location.replace('/dashboard')}/>
  </div>
)};

export default NotFound;
