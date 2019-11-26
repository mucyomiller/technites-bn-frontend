/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../components/login-page/LoginPage";

const props = {
  location: { search: "test query" },
  isAuthenticated: false,
  userData: { status: null },
};

describe("Login Page", () => {
  let loginPage = shallow(
    <MemoryRouter>
      <LoginPage {...props} />
    </MemoryRouter>,
  );

  describe("when the user is authenticated", () => {
    beforeEach(() => {
      props.isAuthenticated = true;
      loginPage = shallow(
        <MemoryRouter>
          <LoginPage {...props} />
        </MemoryRouter>,
      );
    });

    test("should not render the login page", () => {
      expect(loginPage.find("Connect(LoginForm)").exists()).toBe(false);
    });
  });

  describe("when the user is authenticated via social auth", () => {
    beforeEach(() => {
      props.userData.status = "ok";
    });
  });
});
