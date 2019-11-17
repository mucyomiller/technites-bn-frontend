/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import { SOCIAL_LOGIN_SUCCESS } from "../../../redux/actions/actionType";
import socialAuthReducer from "../../../redux/reducers/socialAuthReducer";
import initialState from "../../../redux/store/initialState";
import { payload } from "../../../__mocks__/fixtures";

describe("Login Reducers", () => {
  it("should update the login state", () => {
    const newState = socialAuthReducer(initialState, {
      type: SOCIAL_LOGIN_SUCCESS,
      payload,
    });

    expect(newState.isAuthenticated).toBe(true);
  });

  test("should return the default state by default when there is no action type passed", () => {
    const newState = socialAuthReducer(initialState, { type: "" });
    expect(newState).toEqual(initialState);
  });
});
