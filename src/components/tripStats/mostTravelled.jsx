import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./tripStats.scss";
import { mostTravelled } from "../../redux/actions/RequestActions";

import nairobi from "../../assets/nbi_image.jpg";

class MostTravelled extends Component {
  async componentDidMount() {
    const { mostTravelledDest } = this.props;
    await mostTravelledDest();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { mostTravelledMsg } = this.props;
    return (
      <div data-test="mostVisited" className="most-travelled-div text ">
        <div className="dash-title title">Most Travelled Destinantion</div>
        <hr />
        <div className="ms-left">
          <figure>
            <img
              className="ms-image"
              src={nairobi}
              alt="Most visited location"
            />
          </figure>
        </div>
        <div className="ms-right">
          <span>{ mostTravelledMsg }</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  mostTravelledMsg: state.Requests.mostVisitedMsg,
});

const mapDispatchToProps = {
  mostTravelledDest: mostTravelled,
};

MostTravelled.propTypes = {
  mostTravelledDest: PropTypes.func.isRequired,
  // mostTravelledMsg: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MostTravelled);
