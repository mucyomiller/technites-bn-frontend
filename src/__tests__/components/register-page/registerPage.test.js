/* eslint-disable import/no-named-as-default-member */
/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import { Register } from '../../../components/register-page/RegisterPage';

describe("<RegisterPage />", () => {
  const wrapper = mount(<Register />);

  it("should taste the errors functionality", () => {
    const event = { target: { name: 'firstname', value: 'am' } };
    const input = wrapper.find('input[name="firstname"]');
    input.simulate('change', event);
    const { errors } = wrapper.state();
    expect(errors[event.target.name]).toContain('length must be at least');
  });

  it("should check if data are valid when you send the data without typing", () => {
    const form = wrapper.find('form[className="card"]');
    form.simulate('submit');
  });

  it("should check if password and confirm password are the same", () => {
    const values = [
      { target: { name: 'firstname', value: 'test' } },
      { target: { name: 'lastname', value: 'test' } },
      { target: { name: 'username', value: 'test' } },
      { target: { name: 'email', value: 'test@gmail.com' } },
      { target: { name: 'password', value: 'test1#' } },
      { target: { name: 'confirmPassword', value: 'test1@' } }];

    const input = wrapper.find('input[name="firstname"]');
    values.forEach((value) => {
      input.simulate('change', value);
    });

    const form = wrapper.find('form[className="card"]');
    form.simulate('submit');

    const { data } = wrapper.state();
    expect(data[values[0].target.name]).toEqual(values[0].target.value);
  });

  it("should check if the input field are being rendered", () => {
    const values = [
      { target: { name: 'firstname', value: 'test' } },
      { target: { name: 'lastname', value: 'test' } },
      { target: { name: 'username', value: 'test' } },
      { target: { name: 'email', value: 'test@gmail.com' } },
      { target: { name: 'password', value: 'test1#' } },
      { target: { name: 'confirmPassword', value: 'test1#' } }];
    // const event = { target: { name: 'firstname', value: 'test' } };

    const input = wrapper.find('input[name="firstname"]');
    values.forEach((value) => {
      input.simulate('change', value);
    });

    const { data } = wrapper.state();
    expect(data[values[0].target.name]).toEqual(values[0].target.value);
  });

  it("should simulate the submit button", () => {
    const form = wrapper.find('form[className="card"]');
    form.simulate('submit');
  });
});
