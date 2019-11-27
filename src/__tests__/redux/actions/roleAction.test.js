/* eslint-disable no-unused-vars */
import React from "react";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureStore from "redux-mock-store";
import http from "../../../services/httpServices";
import {
  RETRIEVE_USERS_SUCCESS,
  RETRIEVE_USERS_FAIL,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
} from "../../../redux/actions/actionType";
import { retrieveUsers, addRole } from "../../../redux/actions/roleAction";
import { token } from "../../../__mocks__/fixtures";

const mockedStore = configureStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));
let store;

describe("role actions", () => {
  beforeEach(() => {
    store = mockedStore();
    moxios.install(http.dbCall);
    Storage.prototype.getItem = jest.fn(() => token);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  it("should retrieve users", async () => {
    const successResponse = {
      status: 200,
      response: {
        status: 200,
        data: [
          {
            id: 4,
            firstname: "Travel",
            lastname: "Admin",
            email: "travel@admin.com",
            username: "TravelAdmin",
            is_verified: true,
            role_value: 4,
            line_manager: "technitesdev@gmail.com",
            isEmailAllowed: "true",
            auto_fill: null,
            createdAt: "2019-10-11T10:50:28.214Z",
            updatedAt: "2019-10-11T10:50:28.214Z",
          },
        ],
      },
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    await store.dispatch(retrieveUsers());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_USERS_SUCCESS);
  });
  it("should return error on users retrieval fail", async () => {
    const errorreponse = {
      status: 404,
      response: {
        data: {
          error: {},
        },
      },
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorreponse);
      await flushPromises();
    });
    await store.dispatch(retrieveUsers());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_USERS_FAIL);
  });
  it("should catch network error on users retrieval", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(retrieveUsers());
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(RETRIEVE_USERS_FAIL);
  });

  it("should assign new role to  a user", async () => {
    const successResponse = {
      status: 200,
      response: {
        status: 200,
        message: "role assigned",
      },
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(successResponse);
      await flushPromises();
    });
    const data = {
      comment: "some comment here",
    };
    await store.dispatch(addRole(1, "test@email.com"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(ADD_ROLE_SUCCESS);
  });

  it("it should fail to assign role if wrong data provided", async () => {
    const errorresponse = {
      status: 422,
      error: {
        response: {
          status: 422,
          error: [
            {
              msg: "new_role must be between 1 and 7",
              param: "new_role",
              location: "body",
            },
          ],
        },
      },
    };
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith(errorresponse);
      await flushPromises();
    });
    await store.dispatch(addRole(0, "test@email.com"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(ADD_ROLE_FAIL);
  });
  it("should catch network error on assigning roles", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        message: "Network Error",
      });
      await flushPromises();
    });
    await store.dispatch(addRole(2, "test@email.com"));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(ADD_ROLE_FAIL);
  });
});
