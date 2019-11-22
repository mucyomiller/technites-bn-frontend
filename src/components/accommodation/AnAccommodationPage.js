/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* esdivnt-disable react/destructuring-assignment */
/* esdivnt-disable react/forbid-prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RoomList from "./RoomList";
import { getAccommodation } from "../../redux/actions/accommodatinsAction";
import { retrieveProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";
import Footer from "../footer";
import "../../styles/accommodations.scss";
import MapContainer from "../shared/map/MapContainer";
import sprite from "../../assets/images/svg/sprite.svg";

export class AnAccommodationPage extends Component {
  async componentDidMount() {
    const { accId } = this.props;
    await this.props.retrieveProfile();
    await this.props.getAccommodation(accId);
  }

  render() {
    const { user, accommodation } = this.props;
    return (
      <>
        <HomeNav user={user} />

        <>
          <div className="gallery">
            {!accommodation.images ? (
              <h2>Loading...</h2>
            ) : (
              <div className="gallery__items">
                <img
                  src={accommodation.images[0]}
                  className="gallery__photo--large"
                  alt="accommodation"
                />
                <div className="gallery__sub">
                  <img
                    src={accommodation.images[1]}
                    className="gallery__photo--small"
                    alt="accommodation"
                  />
                  <img
                    src={accommodation.images[2]}
                    className="gallery__photo--small"
                    alt="accommodation"
                  />
                  <img
                    src={accommodation.images[3]}
                    className="gallery__photo--small"
                    alt="accommodation"
                  />
                  <img
                    src={accommodation.images[4]}
                    className="gallery__photo--small"
                    alt="accommodation"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="overview">
            <h1 className="overview__heading">
              {accommodation.accommodation_name}
            </h1>
            <div className="overview__stars">
              <svg className="overview__icon-star">
                <use xlinkHref="../../assets/images/svg/sprite.svg#icon-star" />
              </svg>
              <svg className="overview__icon-star">
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
              <svg className="overview__icon-star">
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
              <svg className="overview__icon-star">
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
              <svg className="overview__icon-star">
                <use xlinkHref={`${sprite}#icon-star`} />
              </svg>
            </div>

            <div className="overview__location">
              <svg className="overview__icon-location">
                <use xlinkHref={`${sprite}#icon-location-pin`} />
              </svg>
              <span className="btn-inline">Nairobi, Kenya</span>
            </div>

            <div className="overview__rating">
              <div className="overview__rating-average">{`${accommodation.likes} likes`}</div>
              <div className="overview__rating-count">like icon</div>
            </div>
          </div>

          <div className="acc__details">
            <div className="acc__details__rooms">
              {!accommodation.Rooms ? (
                <h2>Loading...</h2>
              ) : (
                <RoomList rooms={accommodation.Rooms} />
              )}
            </div>

            <div className="acc__details__map">
              <MapContainer lat={-1.2884} lng={36.8233} name="Hotel Name" />
            </div>
          </div>
        </>

        <Footer />
      </>
    );
  }
}

AnAccommodationPage.propTypes = {
  user: PropTypes.object.isRequired,
  accommodation: PropTypes.object.isRequired,
  getAccommodation: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  accId: ownProps.match.params.acc_id,
  accommodation: state.accommodations.accommodation,
  user: state.profile.user,
});

const mapDispatchToProps = { getAccommodation, retrieveProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnAccommodationPage);
