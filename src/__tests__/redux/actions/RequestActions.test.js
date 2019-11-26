/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  GET_REQUESTS, GET_ERRORS, GET_ALL_REQUESTS, REQUEST_ACTION, GET_PENDING_REQUESTS, GET_PAST_REQUESTS,
} from "../../../redux/actions/actionType";
import { getUserRequests, getMyUsersRequests, approveReject } from "../../../redux/actions/RequestActions";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";
import { token, request as testRequest } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Get User Requests actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve users requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_REQUESTS);
  });
  it("should retrieve users Pending requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests("Pending"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PENDING_REQUESTS);
  });
  it("should retrieve users Past requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests("Past"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PAST_REQUESTS);
  });
  it("should return a failure message when User doesn't have any request", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
  it("it should cover all errors possible", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(getUserRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
});


describe("Get All Requests by Admin actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve all users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ALL_REQUESTS);
  });
  it("should retrieve all Pending users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests("Pending"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PENDING_REQUESTS);
  });
  it("should retrieve all Past users requests to travel admin", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests("Past"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_PAST_REQUESTS);
  });
  it("should return a failure message when there are no requests", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
  it("it should cover all errors possible", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        message: "error",
      });
      await flushPromises();
    });
    await store.dispatch(getMyUsersRequests());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
});

describe("Approve/Reject Action", () => {
  describe("and `REQUEST_ACTION` dispatched with success", () => {
    beforeEach(() => {
      store = mockedStore();
      moxios.install(http.dbCall);
      Storage.prototype.getItem = jest.fn(() => token);
    });

    afterEach(() => {
      moxios.uninstall(http.dbCall);
    });

    test("should dispatch the action", async () => {
      moxios.wait(async () => {
        const requestAction = moxios.requests.mostRecent();
        requestAction.respondWith({ status: 200 });
        await flushPromises();
      });
      await store.dispatch(approveReject({ testRequest, action: "test_actio", status: "test_status" }));
      const calledActions = store.getActions();
      expect(calledActions[0].type).toEqual(REQUEST_ACTION);
    });
  });
});
