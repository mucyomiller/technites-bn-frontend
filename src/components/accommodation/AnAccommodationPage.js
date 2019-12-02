/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* esdivnt-disable react/destructuring-assignment */
/* esdivnt-disable react/forbid-prop-types */
import { toast } from "react-toastify";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RoomList from "./RoomList";
import { getAccommodation, LikeUnLikeAccommodation } from "../../redux/actions/accommodatinsAction";
import { retrieveProfile } from "../../redux/actions/profileAction";
import HomeNav from "../home-nav/HomeNav";
import Footer from "../footer";
import "../../styles/accommodations.scss";
import MapContainer from "../shared/map/MapContainer";
import yellowStar from "../../assets/star-yellow.png";
import whiteStar from "../../assets/star-white.png";
import Rating from "react-rating";
import { rate } from '../../redux/actions/rateAction';
import { getRate } from '../../redux/actions/getRateAction';
import sprite from "../../assets/images/svg/sprite.svg";
import like from "../../assets/like.svg";
import like_outline from "../../assets/like_outline.svg";

export class AnAccommodationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeAction: false
    }
  }
  async componentDidMount() {
    const { accId } = this.props;
    await this.props.retrieveProfile();
    await this.props.getAccommodation(accId);
    await this.props.getRate(accId);
  }

  handleRate = (rate) => {
    toast.success(`${rate} Star rating`);
    this.props.rate({ rate, id: this.props.accId });
  }

  async componentWillReceiveProps() {
    const { likeAction } = this.state;
    if (likeAction) {
      const { accId } = this.props;
      await this.props.getAccommodation(accId);
      this.setState({ likeAction: false });
    }
  }

  likeAnAccommodation = async (id) => {
    this.setState({ likeAction: true })
    await this.props.LikeUnLikeAccommodation(id);
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
              <Rating
                placeholderRating={this.props.averageRatings}
                emptySymbol={<img src={whiteStar} className="icon" />}
                placeholderSymbol={<img src={yellowStar} className="icon" />}
                fullSymbol={<img src={yellowStar} className="icon" />}
                onClick={rate => this.handleRate(rate)} />
            </div>

            <div className="overview__location">
              <span>{`${(this.props.averageRatings) ? this.props.averageRatings : "No "} Average Rating`}</span>
              {/* <div className="overview__icon-location"> */}
              <img className='yellow-star-icon' src={yellowStar} alt="" />
              {/* </div> */}
              <span className="btn-inline">Nairobi, Kenya</span>
            </div>

            <div className="overview__rating">
              <div className="overview__rating-average">{`${accommodation.likes || 0} likes`}</div>
              <div className="overview__rating-count clickable" onClick={() => this.likeAnAccommodation(accommodation.id)}><img src={accommodation.liked ? like : like_outline} width={24} height={24} /></div>
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
  averageRatings: state.accommodations.averageRatings,
  likestate: state.accommodations.accommodationsLikes
});

const mapDispatchToProps = { getAccommodation, retrieveProfile, rate, getRate, LikeUnLikeAccommodation };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnAccommodationPage);
