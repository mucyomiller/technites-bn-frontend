/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import { GET_REQUESTS, GET_ERRORS } from "../../../redux/actions/actionType";
import { getUserRequests } from "../../../redux/actions/UserRequestActions";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Get User Requests actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
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
});