/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import LoginComponent from "../../../components/login-page/LoginPage";

const props = {
  location: { search: "test query" },
  isAuthenticated: true,
  userData: { status: null },
};
const mockStore = configureStore([thunk]);
const store = mockStore({
  loginState: {
    isAuthenticated: true
  }
});
describe("Login Page", () => {
  const loginPage = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginComponent {...props} />
      </MemoryRouter>
    </Provider>,
  );

  describe("when the user is authenticated", () => {
    test("should not render the login page", () => {
      // look into his in deep
      expect(loginPage.find("Connect(LoginForm)").exists()).toBe(true);
    });
  });

  describe("when the user is authenticated via social auth", () => {
    beforeEach(() => {
      props.userData.status = "ok";
    });
  });
});
