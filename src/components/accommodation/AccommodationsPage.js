/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccommodationList from "./AccommodationList";
import {
  getAccommodations,
  getAccommodation,
} from "../../redux/actions/accommodatinsAction";
import { retrieveProfile } from "../../redux/actions/profileAction";
import SideBar from "../side-bar";
import HomeNav from "../home-nav/HomeNav";
import Footer from "../footer";
import "../../styles/accommodations.scss";

export class AccommodationsPage extends Component {
  componentDidMount() {
    this.props.retrieveProfile();
    this.props.getAccommodations();
  }

  render() {
    const { user, accommodations } = this.props;
    return (
      <>
        <HomeNav user={user} />
        <SideBar />
        {!accommodations ? (
          <h2>Loading...</h2>
        ) : (
          <div className="acc-page">
            <AccommodationList accommodations={accommodations} />
          </div>
        )}
        <Footer />
      </>
    );
  }
}

AccommodationsPage.propTypes = {
  getAccommodations: PropTypes.func.isRequired,
  retrieveProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  accommodations: state.accommodations.accommodations,
  user: state.profile.user,
});

const mapDispatchToProps = {
  getAccommodations,
  getAccommodation,
  retrieveProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationsPage);
