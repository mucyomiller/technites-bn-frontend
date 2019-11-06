/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import { LOGIN } from "../../../redux/actions/actionType";
import loginReducer from "../../../redux/reducers/loginReducer";
import rootReducer from "../../../redux/reducers/rootReducer";
import testReducer from "../../../redux/reducers/testReducer";
import initialState from "../../../redux/store/initialState";
import { payload } from "../../../__mocks__/fixtures";

describe("Login Reducers", () => {
  it("should update the login state", () => {
    const newState = loginReducer(initialState, {
      type: LOGIN,
      response: payload
    });

    expect(newState.isAuthenticated).toBe(true);
  });
});
