/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { shallow } from "enzyme";
import thunk from "redux-thunk";

import configureStore from "redux-mock-store";
import {
  SingleNotification,
} from "../../../components/notification/singleNotification";

const mockStore = configureStore([thunk]);
// setUp
// eslint-disable-next-line no-unused-vars
const Initialprops = {
  type: "type",
  message: "messge",
  seen: false,
  notificationCount: 1,
  key: 1,
  requestId: 2,
  notId: 3,
  markThisRead: jest.fn(),
  toggleNotDisplay: jest.fn(),
  notPaneDisplay: false,
  loadNotifications: jest.fn(),
};

const store = mockStore(Initialprops);
const renderSingleNotification = () => shallow(<SingleNotification {...Initialprops} />);
const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);

test("It renders without crashing", () => {
  const wrapper = renderSingleNotification();
  const component = findByAttr(wrapper, "single-notification");
  expect(component.length).toBe(1);
});

test("On click it marks notification as read", () => {
  const wrapper = renderSingleNotification();
  const component = findByAttr(wrapper, "single-notification").last();
  component.simulate("click");
  expect(component.props().to).toBe("/requests/2/");
});
