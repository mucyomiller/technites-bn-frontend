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
import { register } from "../../../redux/actions/registerAction";
import { REGISTER } from "../../../redux/actions/actionType";


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

  it("should register user if data are valid", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Successfully registered in",
          data: {},
        },
      });
      await flushPromises();
    });

    const data = {
      username: "test",
      firstname: "test",
      lastname: "test",
      email: "manigga@gmail.com",
      password: "test1#",
      confirmPassword: "test1#",
    };

    await store.dispatch(register(data));
    const calledActions = store.getActions();
    expect(calledActions[0].type).toEqual(REGISTER);
  });

  it("should return an error if data apart from inputs are invalid", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          error: [{ msg: "error message" }],
        },
      });
      await flushPromises();
    });

    const data = {
      username: "test",
      firstname: "test",
      lastname: "test",
      email: "manigga@gmail.com",
      password: "test1#",
      confirmPassword: "test1#",
    };

    await store.dispatch(register(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });

  it("should return an error if data from inputs are invalid", async () => {
    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 409,
        response: {
          error: {},
        },
      });
      await flushPromises();
    });

    const data = {
      username: "test",
      firstname: "test",
      lastname: "test",
      email: "manigga@gmail.com",
      password: "test1#",
      confirmPassword: "test1#",
    };

    await store.dispatch(register(data));
    const calledActions = store.getActions();
    expect(calledActions.length).toEqual(0);
  });
});
