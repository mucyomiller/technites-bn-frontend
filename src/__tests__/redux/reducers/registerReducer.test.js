/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import { REGISTER } from "../../../redux/actions/actionType";
import register from "../../../redux/reducers/registerReducer";
import rootReducer from "../../../redux/reducers/rootReducer";
import testReducer from "../../../redux/reducers/testReducer";
import initialState from "../../../redux/store/initialState";

describe("Reducers", () => {
  it("should pass this test", () => {
    const payload = {
      status: 201,
      message: "Sign up the",
      data: {
        id: 28,
        email: "amilylisy@yahoo.com",
        firstname: "amily",
        lastname: "kassim",
        role_value: 1,
        username: "amilykassim",
      },
      token: "eyJhbGcibK-l8Ic4",
    };

    const newState = register(initialState, {
      type: REGISTER,
      payload,
    });

    expect(newState.users).toBe(payload.data);
  });

  it("should pass this test", () => {
    const payload = {};

    const newState = register(initialState, {
      type: "",
      payload,
    });
    expect(Object.keys(newState.users).length).toBe(Object.keys(payload).length);
  });
});
