/* eslint-disable react/prop-types */
import React from "react";

const SingleTrip = ({
  requestType,
  location,
  depDate,
  retDate,
  reason,
  destinations,
}) => (
  <li>
    <div className="ts-card ">
      <p>
        Request Type:
        {" "}
        <span className="blue-text">{requestType}</span>
      </p>
      <p>
        Location:
        {" "}
        <span className="blue-text">{location}</span>
      </p>
      <p>
        Depature date:
        {" "}
        <span className="blue-text">{depDate}</span>
      </p>
      <p>
        Return date:
        {" "}
        <span className="blue-text">{retDate}</span>
      </p>
      <p>
        Reason:
        {" "}
        <span className="blue-text">{reason}</span>
      </p>
      <br />
      <h3>Destinations</h3>
      <hr />
      {destinations === undefined
        ? null
        : destinations.map((dest) => (
          <div data-test="destinations" key={dest.destination_id}>
            <p>
                Destination:
              {" "}
              <span className="blue-text">{dest.destination_id}</span>
            </p>
            <p>
                Room:
              {" "}
              <span className="blue-text">{dest.room_id}</span>
            </p>
            <p>
                Check in date:
              {" "}
              <span className="blue-text">{dest.check_in}</span>
            </p>
            <p>
                Check out date:
              {" "}
              <span className="blue-text">{dest.check_out}</span>
            </p>
          </div>
        ))}
    </div>
  </li>
);

export default SingleTrip;
