/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  RESET_HOST, GET_ERRORS,
} from "../../../redux/actions/actionType";
import { resetHostPassword } from "../../../redux/actions/HostActions";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";
import errorreponse from "../../../__mocks__/__get_user_request_failure__.json";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Admin actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    // Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should add host", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(resetHostPassword());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RESET_HOST);
  });
  it("should return a failure message when action failed", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(resetHostPassword());
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
    await store.dispatch(resetHostPassword());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(GET_ERRORS);
  });
});

