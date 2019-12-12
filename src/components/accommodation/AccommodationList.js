/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React from 'react';
import sprite from "../../assets/images/svg/sprite.svg";


export const AccommodationCard = ({ accommodations, viewAcc }) => {
  return (
    <div className="acc__resources ">
      {accommodations.map(accommodation => {
        return (
          <div key={accommodation.id} className="acc__resources__item" onClick={() => viewAcc(accommodation.id)}>
            <div className="acc__resources__item__img">
              {!accommodation.images ? (
                <img
                  class="composition__photo--acc"
                  src="https://img.icons8.com/officel/200/000000/image-file.png"
                  alt="not found icon"
                />
              ) : (
                <img
                  src={accommodation.images[0]}
                  alt="photo 1"
                  class="composition__photo--acc"
                />
              )}
            </div>
            <div className="acc-details">
                <h3>{accommodation.accommodation_name}</h3>
              <p>
                {accommodation.description || 'Your home away from home...'}
              </p>
              <div className="likes__feedback" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccommodationCard;
