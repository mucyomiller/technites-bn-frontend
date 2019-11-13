import React from "react";
import { shallow } from "enzyme";
import { SocialLogin } from "../../../components/login-page/SocialLogins";

const props = {
  location
};
describe("Social Logins", () => {
  const socialLogin = shallow(<SocialLogin {...props} />);

  test("should render the social login buttons", () => {
    expect(socialLogin.find(".socialMediaButtons").exists()).toBe(true);
  });
});
