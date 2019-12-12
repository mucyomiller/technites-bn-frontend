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
import SideBar from "../side-bar";
import HomeNav from "../home-nav/HomeNav";
import Footer from "../footer";
import "../../styles/accommodations.scss";

export class AccommodationsPage extends Component {
  componentDidMount() {
    this.props.getAccommodations();
  }

  render() {
    const viewAcc = (id) => {
      this.props.history.push(`/accommodations/${id}`);
    }

    const { user, accommodations } = this.props;
    return (
      <>
        <HomeNav />
        <SideBar />
        {!accommodations ? (
          <h2>Loading...</h2>
        ) : (
          <div className="acc-page">
            <AccommodationList accommodations={accommodations} viewAcc={viewAcc}/>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

AccommodationsPage.propTypes = {
  getAccommodations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => { 
  return {
  accommodations: state.accommodations.accommodations,
  user: state.profile.user,
}};

const mapDispatchToProps = {
  getAccommodations,
  getAccommodation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationsPage);
