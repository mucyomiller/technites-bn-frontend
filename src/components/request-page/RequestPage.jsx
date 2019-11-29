/* eslint-disable react/no-danger */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable react/button-has-type */
/* eslint-disable no-self-assign */
/* eslint-disable camelcase */
import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { createRequest } from "../../redux/actions/createRequest";
import Form from "../form/form";
import Counter from "../counter/Counter";
import { deleteRequest } from "../../redux/actions/deleteRequest";
import { editRequest } from "../../redux/actions/editRequest";
import { getUserRequests, setAutoFill, getMyUsersRequests } from "../../redux/actions/RequestActions";
import { getAccomodations } from "../../redux/actions/getAccomodations";
import { getRooms } from "../../redux/actions/getRooms";
import ImageContainer from "../image-container/ImageContainer";

import "./RequestPage.scss";

export class RequestPage extends Form {
  doSubmit = async (type, value = "") => {
    if (type === "delete") {
      this.props.deleteRequest(this.props.match.params.id);
    } else if (type === "edit") {
      this.props.editRequest(this.props.match.params.id, this.state.data);
    } else if (type === "autoFill") {
      // do something
      this.props.setAutoFill(value);
    } else {
      this.props.createRequest(this.state.data);
    }
  };

  schema = {
    request_type: Joi.string(),
    location_id: Joi.number()
      .required()
      .label("Location"),
    departure_date: Joi.string()
      .required()
      .label("Departure Date"),
    return_date: Joi.string().label("Return Date"),
    destination_id: Joi.number()
      .required()
      .label("Destination"),
    accomodation_id: Joi.number()
      .required()
      .label("Accomodation"),
    room_id: Joi.number()
      .required()
      .label("Room"),
    check_in: Joi.string()
      .required()
      .label("Check In"),
    check_out: Joi.string()
      .required()
      .label("Check Out"),
    passport_name: Joi.string()
      .required()
      .label("Passport name"),
    passport_number: Joi.number()
      .required()
      .label("Passport number"),
    reason: Joi.string()
      .required()
      .label("Reason"),
    destinations: Joi.array()
  };

  populateRequestPage = async () => {
    let requestCopy = {};
    try {
      // SET THE ACCOMODATIONS IN THE STATE
      await this.props.getAccomodations();

      const { accomodations: results } = this.props.accomodations;

      const allAccomodations = [];
      const allRooms = [];
      allAccomodations.push({ id: 0, name: "Choose an accomodation" });

      // getting all of the accomodations
      for (let i = 0; i < results.data.data.length; i++) {
        allAccomodations.push({
          id: results.data.data[i].id,
          name: results.data.data[i].accommodation_name,
          location: Number(results.data.data[i].location)
        });
      }

      // SET THE ROOMS TO THE STATE
      for (let i = 0; i < allAccomodations.length; i++) {
        await this.props.getRooms(allAccomodations[i].id);

        const { rooms } = this.props.rooms;
        for (let j = 0; j < rooms.data.data.length; j++) {
          allRooms.push({
            id: rooms.data.data[j].id,
            name: rooms.data.data[j].name,
            accomodation_id: Number(rooms.data.data[j].accommodation_id),
            cost: rooms.data.data[j].cost,
            images: {
              image1: rooms.data.data[j].images[0].image_url,
              image2: rooms.data.data[j].images[1].image_url
            }
          });
        }
      }

      this.setState({
        accomodations: allAccomodations,
        rooms: allRooms
      });

      const requestId = this.props.match.params.id;
      
      if (this.props.currentUser.role_value >= 4)
        await this.props.getMyUsersRequests("All");
      else await this.props.getUserRequests();

      if (requestId === "new") {
        if (this.props.currentUser.auto_fill) {
          const { requests } = this.props.requests;
          const lastRequest = requests.reverse()[0];
          this.setState({
            data: {
              ...this.state.data,
              passport_name: lastRequest.passport_name,
              passport_number: lastRequest.passport_number
            }
          });
        }
        return;
      }

      const { requests } = this.props.requests;
      const singleRequest = requests.filter(
        request => request.id == this.props.match.params.id
      );

      // if you pass an invaid ID, you will be redirected to not found
      if (singleRequest.length === 0) this.props.history.replace("/not-found");
      // remove unwanted fields
      const {
        id,
        user_id,
        createdAt,
        updatedAt,
        status,
        ...request
      } = singleRequest[0];

      // assign these data so that we can auto fill the select and input fields
      request.check_in = request.destinations[0].check_in;
      request.check_out = request.destinations[0].check_out;
      request.destination_id = request.destinations[0].destination_id;
      request.destinations[0].destination_id = request.destinations[0].destination_id;
      request.accomodation_id = request.destinations[0].accomodation_id;
      request.room_id = request.destinations[0].room_id;
      request.departure_date = request.departure_date;

      // when there is no return date, take a request copy as it will throw an exception
      requestCopy = request;

      request.return_date = request.return_date;
      request.request_type = "ReturnTrip";

      // //. POPULATE ROOMS //

      // initialize the current accomodation with the accomodations
      // of the first location once the page is mounted
      const initialAccomodation = allAccomodations.filter(
        ac => ac.location === request.destination_id
      );

      // // to get the initial room
      const initialRoom = allRooms.filter(
        ac => ac.accomodation_id === initialAccomodation[0].id
      );

      this.setState({
        currentAccomodations: initialAccomodation,
        currentRooms: initialRoom
      });

      this.setState({ data: request });
    } catch (ex) {
      // by default it takes a request type of OneWay when you don't supply any
      if (ex.response) {
        this.props.history.replace("/not-found");
      }
      this.setState({ data: requestCopy });
    }
  };

  async componentDidMount() {
    this.populateRequestPage();
  }

  componentWillReceiveProps(props) {
    const { currentUser } = props;
    if (!_.isEmpty(currentUser)) {
      this.setState({ autoFill: currentUser.auto_fill });
    }
  }

  render() {
    const {
      data,
      counter,
      cities,
      currentRooms,
      currentAccomodations
    } = this.state;

    return (
      <div>
        <ImageContainer images={currentRooms} />
        <div className="request-card">
          {this.state.rooms.length > 1 ? null : (
            <div className="spinner-container">
              <span className="loader">
                <span className="loader-inner" />
              </span>
            </div>
          )}
          <div>
            {counter.count > 0 ? (
              <button
                onClick={() => this.handleSubmit("back")}
                className="button"
              >
                back
              </button>
            ) : null}

            {data.destinations !== undefined
              && counter.count < data.destinations.length - 1 ? (
                <button
                  onClick={() => this.handleSubmit("forward")}
                  className="button"
                >
                  forward
              </button>
              ) : null}
          </div>
          {counter.count > 0 ? <div className="box stack-top" /> : null}
          <div>
            <Counter animation={counter.animation} count={counter.count + 1} />
            {this.renderSelect("location_id", "From", cities)}
            {this.renderSelect(
              "departure_date",
              "Departure Date",
              cities,
              "date"
            )}
            {this.renderSelect("return_date", "Return Date", cities, "date")}
            {this.renderSelect("destination_id", "Destination", cities)}
            {this.renderSelect("check_in", "Check In", cities, "date")}
            {this.renderSelect("check_out", "Check Out", cities, "date")}
            {this.renderSelect(
              "accomodation_id",
              "Accomodation",
              currentAccomodations
            )}
            {this.renderSelect("room_id", "Room", currentRooms)}
            <div>{this.renderInput("passport_name", "Passport Name")}</div>
            <div>{this.renderInput("passport_number", "Passport Number")}</div>
            {/* <div>{this.renderInput("reason", "Reason")}</div> */}
            <p className="reason">Reason</p>
            <p className="reason-label">
              {this.props.match.params.id !== "new"
                && this.state.data.reason ? (
                  <p
                    className="comment-content"
                    dangerouslySetInnerHTML={{
                      __html: this.state.data.reason.replace(
                        /(<? *script)/gi,
                        "illegalscript"
                      )
                    }}
                  />
                ) : (
                  "Fill your reason down there..."
                )}
            </p>
            {this.renderEditor()}
            <div>
              <label htmlFor="autofill" className="pure-material-checkbox">
                <input type="checkbox" name="autofill" onChange={this.handleAutoFill} checked={this.state.autoFill} />
                <span>&nbsp;Remember Personal details</span>
              </label>
            </div>
            {this.props.match.params.id === "new"
              ? this.renderButton("Request", "submit")
              : this.renderButton("Save", "edit")}
            {this.props.match.params.id === "new"
              ? this.renderButton("Add city", "animation", "addCity")
              : this.renderButton("Delete", "delete")}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  requests: state.Requests,
  accomodations: state.accomodations,
  rooms: state.rooms,
  currentUser: state.profile.user
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    createRequest,
    deleteRequest,
    editRequest,
    getUserRequests,
    getMyUsersRequests,
    setAutoFill,
    getAccomodations,
    getRooms
  })
)(RequestPage);
