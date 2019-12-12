/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./tripStats.scss";
import { tripsStatsAction } from "../../redux/actions/RequestActions";
import { retrieveProfile } from '../../redux/actions/profileAction';

export class TripStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: 0,
      months: 0,
      days: 0,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { years, months, days } = this.state;
    const { userId, tripsStat } = this.props;
    const dayz = days || 1;
    await tripsStat(userId, years, months, dayz);
  };

  handleYearsChange = (event) => {
    this.setState({
      years: event.target.value,
    });
  };

  handleMonthsChange = (event) => {
    this.setState({
      months: event.target.value,
    });
  };

  handleDaysChange = (event) => {
    this.setState({
      days: event.target.value,
    });
  };
  
  async componentDidMount() {
    await this.props.getUser();
  }
  render() {
    const { years, months, days } = this.state;
    if (this.props.userRole < 1) {
      return null
    }
    return (
      <div className="trip-stat ">
        <form className="ts-form" onSubmit={this.handleSubmit}>
          <div className="dash-title title">Trip Stats</div>
          <hr />
          <p className="text ps-test">Trips for the last:</p>
          <br />
          <label className="label" htmlFor="years">
            Years
            <input
              className="input"
              name="years"
              type="number"
              min={0}
              value={years}
              onChange={this.handleYearsChange}
            />
          </label>
          <label className="label" htmlFor="months">
            Months
            <input
              className="input"
              name="months"
              type="number"
              min={0}
              value={months}
              onChange={this.handleMonthsChange}
            />
          </label>
          <label className="label" htmlFor="days">
            Days
            <input
              className="input"
              name="days"
              type="number"
              min={0}
              value={days}
              onChange={this.handleDaysChange}
            />
          </label>
          <button className="button" type="submit" >
            Calculate Trips
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  tripsStat: tripsStatsAction,
  getUser: retrieveProfile,
};

const mapStateToProps = (state) => ({
  userId: state.profile.user.id || 0,
  userRole: state.profile.user.role_value || 0
});

export default connect(mapStateToProps, mapDispatchToProps)(TripStats);
