/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  RETRIEVE_FEEDBACK_SUCCESS,
  RETRIEVE_FEEDBACK_FAIL,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAIL
} from "../../../redux/actions/actionType";
import { retrieveFeedback, submitFeedback } from "../../../redux/actions/feedbackAction";
import { token } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Feedback actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve feedbacks", async () => {
    const successResponse = {
      "status": 200,
      "response": {
        "data": {
          "status": 200,
          "message": "Feedbacks Found",
          "feedbacks": [
            {
              "id": 2,
              "feedback": "some feedback",
              "user_id": 1,
              "accommodation_id": 9,
              "createdAt": "2019-12-03T10:33:07.474Z",
              "updatedAt": "2019-12-03T10:33:07.474Z",
              "User": {
                "id": 1,
                "firstname": "John",
                "lastname": "Doe",
                "image_url": null
              }
            }
          ]
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    await store.dispatch(retrieveFeedback(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_FEEDBACK_SUCCESS);
  });
  it("should return error on feedback retrieval fail", async () => {
    const errorreponse = {
      "status": 404,
      "response": {
        "data": {
          "error": {}
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(retrieveFeedback(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_FEEDBACK_FAIL);
  });
  it("should catch network error on feedback retrieval", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(retrieveFeedback(1));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_FEEDBACK_FAIL);
  });

  it("should submit a feedback", async () => {
    const successResponse = {
      "status": 201,
      "response": {
        "status": 201,
        "message": "Feedback successfully added",
        "data": {
          "feedback": "some fourth feedback",
          "id": 16,
          "accommodation_id": 9,
          "user_id": 1,
          "updatedAt": "2019-12-04T06:01:39.287Z",
          "createdAt": "2019-12-04T06:01:39.287Z"
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    const data = {
      "feedback": "some fourth feedback",
    }
    await store.dispatch(submitFeedback(1, data));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_FEEDBACK_SUCCESS);
  });
  it("it should fail when on submit wrong data provided", async () => {
    const errorresponse = {
      "status": 422,
      "error": {
        "response": {
          "status": 422,
          "error": [
            {
              "msg": "feedback can not be empty",
              "param": "feedback",
              "location": "body"
            },
            {
              "msg": "feedback field required",
              "param": "feedback",
              "location": "body"
            }
          ]
        }
      }
    }
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorresponse);
      await flushPromises();
    });
    await store.dispatch(submitFeedback(1, {}));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_FEEDBACK_FAIL);
  });
  it("should catch network error on feedback submission", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(submitFeedback(1, {}));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(SUBMIT_FEEDBACK_FAIL);
  });

});
