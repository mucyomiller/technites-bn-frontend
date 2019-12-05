/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { mount } from "enzyme";
import sinon from "sinon";
import {
  PassReset,
  mapStateToProps
} from "../../../components/passwordReset/forgotEmailForm";

const onSubmit = sinon.spy();

const props = {
  passWordResetAction: jest.fn(),
  displayVerifyConfirmation: false
};
const setUp = () => mount(<PassReset onSubmit={onSubmit} {...props} />);
const findByAttr = (wrapper, dataTest) =>
  wrapper.find(`[data-test="${dataTest}"]`);

test("it renders component successfully", () => {
  const wrapper = setUp();
  expect(wrapper.length).toBe(1);
});

it("should check if data are valid when you send the data without typing", () => {
  const wrapper = setUp();
  const button = wrapper.find("button[className='button']");
  button.simulate("click");
});

it("should return a different component on success verify", () => {
  props.displayVerifyConfirmation = true;
  const wrapper = setUp();
  const verifyComponent = findByAttr(wrapper, "success-component");
  expect(verifyComponent.length).toBe(1);
});

it("Tests map state to props", () => {
  const initialState = {
    passwordReset: { displayVerify: false }
  };

  expect(mapStateToProps(initialState).displayVerifyConfirmation).toEqual(
    false
  );
});
