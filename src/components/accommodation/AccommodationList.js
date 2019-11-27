/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from "react";

export const AccommodationCard = ({ accommodations }) => {
  return (
    <div className="acc__resources ">
      {accommodations.map((accommodation) => {
        const url = `url(${accommodation.images[0]})`;
        return (
          <div
            key={accommodation.id}
            className="acc__resources__item"
          >
            <div
              className="acc__resources__item__img"
              style={{ backgroundImage: url }}
            />
            <div className="acc-details">
              <a href={`/accommodations/${accommodation.id}`}>
                <h3>{accommodation.accommodation_name}</h3>
              </a>
              <p>{accommodation.description || "Your home away from home..."}</p>
              <div className="likes__feedback" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccommodationCard;
