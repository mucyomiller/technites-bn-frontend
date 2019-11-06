import React from "react";
import { shallow } from "enzyme";
import VerifyPasswordReset from "../../../components/passwordReset/passwordResetConfirmation";

const setUp = () => shallow(<VerifyPasswordReset />);
// tests
test("it renders the component successfully", () => {
  const wrapper = setUp();
  expect(wrapper.length).toBe(1);
});
