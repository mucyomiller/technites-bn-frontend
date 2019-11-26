import React from "react";
import { shallow } from "enzyme";
import { SocialLogin } from "../../../components/login-page/SocialLogins";

const props = {
  location,
};
describe("Social Logins", () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn(), replace: jest.fn(), reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });


  const socialLogin = shallow(<SocialLogin {...props} />);

  test("should render the social login buttons", () => {
    expect(socialLogin.find(".socialMediaButtons").exists()).toBe(true);
  });

  describe("when the gmail button is clicked", () => {
    test("should redirect to google callback", () => {
      const spyGmailCall = jest.spyOn(socialLogin.instance(), "gmailLogin");
      socialLogin.instance().forceUpdate();
      socialLogin.find(".gmail").simulate("click", spyGmailCall);

      expect(spyGmailCall).toHaveBeenCalled();
    });
  });

  describe("when the facebook button is clicked", () => {
    test("should redirect to facebook callback", () => {
      const spyFacebookCall = jest.spyOn(
        socialLogin.instance(),
        "facebookLogin",
      );
      socialLogin.instance().forceUpdate();
      socialLogin.find(".facebook").simulate("click", spyFacebookCall);

      expect(spyFacebookCall).toHaveBeenCalled();
    });
  });
});
