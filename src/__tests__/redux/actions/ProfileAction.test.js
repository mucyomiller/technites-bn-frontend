/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  UPDATE_PROFILE, RETRIEVE_PROFILE, RETRIEVE_FAIL, UPDATE_FAIL,
} from "../../../redux/actions/actionType";
import { updateProfile, retrieveProfile } from "../../../redux/actions/profileAction";
import successresponse from "../../../__mocks__/__profile_response_success.json";
import errorreponse from "../../../__mocks__/__profile_response_error__.json";
import updatesuccess from "../../../__mocks__/__profile_update_success__.json";
import errorupdate from "../../../__mocks__/__profile_update_error__.json";
import { token } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("Profile actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve user profile", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successresponse);
      await flushPromises();
    });
    await store.dispatch(retrieveProfile());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_PROFILE);
  });
  it("should return error on retrieval fail", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(retrieveProfile());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_FAIL);
  });
  it("should update profile", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(updatesuccess);
      await flushPromises();
    });
    const data = new FormData();
    data.append("gender", "Male");
    await store.dispatch(updateProfile(data));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(UPDATE_PROFILE);
  });
  it("it should fail to  is wrong data provided", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorupdate);
      await flushPromises();
    });
    const data = new FormData();
    data.append("genders", "Male");
    await store.dispatch(updateProfile(data));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(UPDATE_FAIL);
  });
});
