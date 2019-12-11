/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNav from "../home-nav/HomeNav";
import "./dashboard.scss";
import MostTravelled from "../tripStats/mostTravelled";
import SideBar from "../side-bar";
import SingleTrip from "../tripStats/singleTrip";
import TripStats from "../tripStats/tripStats";

class Dashboard extends Component {
  render() {
    const { total, trips, user } = this.props;
    return (
      <div>
        <HomeNav />
        <SideBar />
        <div className="dashboard">
          <div className="dashboard__left-dash">
            <div className="trips-stats dash-div">
              <div className="title dashboard__title">Trips Statistics</div>
              <div className="trip-stat-content">
                <h3 className="total-trips-title">
                  Total trips:
                  {" "}
                  {total}
                </h3>
                <ul>
                  {total === 0 ? <p> You have no trips in the specified time frame</p> : null}
                  {(trips === undefined) ? null : trips.map((trip) => (
                    <SingleTrip
                      key={trip.id}
                      requestType={trip.request_type}
                      location={trip.location_id}
                      depDate={trip.departure_date}
                      destinations={trip.destinations}
                      retDate={trip.return_date}
                      reason={trip.reason}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="dashboard__right-dash">
            <div className="space-between">
              <hr />
            </div>
            <MostTravelled />
            <TripStats />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trips: state.Requests.trips,
  total: state.Requests.totalTrips,
  user: state.profile.user,
});

export default connect(mapStateToProps, null)(Dashboard);
