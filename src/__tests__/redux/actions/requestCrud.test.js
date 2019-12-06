/* eslint-disable comma-dangle */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import Enzyme from "enzyme/build";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16/build";
import http from "../../../services/httpServices";
import { GET_ALL_ACCOMODATIONS, GET_ALL_ROOMS, LIKE_UNLIKE_ACCOMMODATION } from "../../../redux/actions/actionType";
import { getAccomodations } from "../../../redux/actions/getAccomodations";
import { getRooms } from "../../../redux/actions/getRooms";
import { LikeUnLikeAccommodation } from "../../../redux/actions/accommodatinsAction";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";
import { createRequest } from '../../../redux/actions/createRequest';
import { CREATE_REQUEST } from '../../../redux/actions/actionType';
import { deleteRequest } from '../../../redux/actions/deleteRequest';
import { editRequest } from '../../../redux/actions/editRequest';


Enzyme.configure({ adapter: new Adapter() });

let store;
const mockedStore = configureStore([thunk]);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));


describe("Register in actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should trigger the accomodation action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: [{}],
        },
      });
      await flushPromises();
    });

    await store.dispatch(getAccomodations());
    const calledActions = store.getActions();

    expect(calledActions[0].type).toEqual(GET_ALL_ACCOMODATIONS);
  });

  it("should trigger the create request action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: [{}],
        },
      });
      await flushPromises();
    });

    const data = {
      request_type: "ReturnTrip",
      location_id: 1,
      departure_date: "2019-11-25",
      passport_name: "amily",
      passport_number: 1234567890,
      return_date: "2019-11-30",
      destinations: [
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 1,
          accomodation_id: 1
        },
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 4,
          accomodation_id: 7
        },
      ],
      reason: "visit somewhere jiggle",
    };


    await store.dispatch(createRequest(data));
    const calledActions = store.getActions();
  });

  it("should test the error of create a request", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          data: {
            error: "",
          }
        },
      });
      await flushPromises();
    });

    const data = {
      request_type: "ReturnTrip",
      location_id: 1,
      departure_date: "2019-11-25",
      passport_name: "amily",
      passport_number: 1234567890,
      return_date: "2019-11-30",
      destinations: [
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 1,
          accomodation_id: 1
        },
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 4,
          accomodation_id: 7
        },
      ],
      reason: "visit somewhere jiggle",
    };

    await store.dispatch(createRequest(data));
    store.getActions();
  });

  it("should trigger the edit request action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: [{}],
        },
      });
      await flushPromises();
    });

    const data = {
      check_in: "2019-11-26",
      check_out: "2019-11-29",
      destination_id: 1,
      accomodation_id: 1,
      room_id: 1,
      request_type: "ReturnTrip",
      location_id: 1,
      departure_date: "2019-11-25",
      passport_name: "amily",
      passport_number: 1234567890,
      return_date: "2019-11-30",
      destinations: [
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 1,
          accomodation_id: 1
        },
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 4,
          accomodation_id: 7
        },
      ],
      reason: "visit somewhere jiggle",
    };


    await store.dispatch(editRequest(1, data));
    store.getActions();
  });

  it("should test the error of edit a request", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          data: {
            error: ""
          },
        }
      });
      await flushPromises();
    });

    const data = {
      check_in: "2019-11-26",
      check_out: "2019-11-29",
      destination_id: 1,
      accomodation_id: 1,
      room_id: 1,
      request_type: "ReturnTrip",
      location_id: 1,
      departure_date: "2019-11-25",
      passport_name: "amily",
      passport_number: 1234567890,
      return_date: "2019-11-30",
      destinations: [
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 1,
          accomodation_id: 1
        },
        {
          check_in: "2019-11-26",
          check_out: "2019-11-29",
          destination_id: 4,
          accomodation_id: 7
        },
      ],
      reason: "visit somewhere jiggle",
    };

    await store.dispatch(editRequest(1, data));
    store.getActions();
  });

  it("should trigger the delete action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: [{}],
        },
      });
      await flushPromises();
    });

    await store.dispatch(deleteRequest(1));
    store.getActions();
  });

  it("should test the error of delete action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(deleteRequest(1));
    store.getActions();
  });

  it("should trigger the room action", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: [{}],
        },
      });
      await flushPromises();
    });

    await store.dispatch(getRooms());
    store.getActions();
  });

  it("should test the accomodation error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getAccomodations());
    store.getActions();
  });

  it("should test the room error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getRooms());
    store.getActions();
  });
  it("should test LikeUnLikeAccommodation like_success", async () => {
    const resp = {
      status: 200,
      response: {
        status: 200,
        message: "Liked  Successfuly",
      },
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(resp);
      await flushPromises();
    });
    await store.dispatch(LikeUnLikeAccommodation(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LIKE_UNLIKE_ACCOMMODATION);
  });

  it("should test LikeUnLikeAccommodation like_error", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(LikeUnLikeAccommodation(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(LIKE_UNLIKE_ACCOMMODATION);
  });

});
