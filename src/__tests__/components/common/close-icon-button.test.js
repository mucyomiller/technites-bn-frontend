/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import CloseIconButton from "../../../components/common/close-icon-button";

// setUp
// eslint-disable-next-line no-unused-vars
const props = {
  onClose: jest.fn(),
};
const setUp = () => shallow(<CloseIconButton {...props} />);
const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);
// tests
test.only("It renders without error", () => {
  const wrapper = setUp();
  const closeIcon = findByAttr(wrapper, "component-close-icon");
  expect(closeIcon.length).toBe(1);
  expect(closeIcon.text()).toBeTruthy()
  console.log(closeIcon.text());
});
