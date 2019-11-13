import React from "react";
import { shallow } from "enzyme";
import { LoginForm } from "../../../components/login-page/LoginForm";

const event = {
  target: {},
  defaultPrevented: jest.fn(),
};

const props = {
  socialAuth: { token: "test token", user: { name: "test", email: "test" } },
  socialAuthAction: jest.fn(),
};

describe("Login Form", () => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const loginForm = shallow(<LoginForm {...props} />);

  test("should render the title as `Login`", () => {
    expect(loginForm.find(".title").text()).toEqual("Login");
  });

  it("should test for login a user", () => {
    const button = loginForm.find("button[className=\"button\"]");
    button.simulate("click");
  });

  test("should render the login button", () => {
    expect(loginForm.find(".button").text()).toEqual("Login");
  });

  test("should render the sociallogin buttons", () => {
    expect(loginForm.find("SocialLogin").exists()).toBe(true);
  });

  test("should render forgot password Link", () => {
    expect(loginForm.find("Link").text()).toEqual(" Reset ");
  });

  describe("and input in forms change", () => {
    beforeEach(() => {
      const emailInput = loginForm.find("Input[name=\"email\"]");
      const passwordInput = loginForm.find("Input[name=\"password\"]");

      emailInput.simulate("change", {
        ...event,
        target: { name: "email", value: "test@email.com" },
      });
      passwordInput.simulate("change", {
        ...event,
        target: { name: "password", value: "test@pass" },
      });
    });

    test("should update state on change", () => {
      expect(loginForm.state().data.email).toEqual("test@email.com");
    });
  });
});
