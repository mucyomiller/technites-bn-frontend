/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import MostTravelled from "../../../components/tripStats/mostTravelled";

const mockStore = configureStore([thunk]);
const state = {
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
  isAuthenticated: false,
  notifications: [],
  Requests: {
    trips: [],
    totalTrips: 0,
    mostVisitedMsg: "Message",
  },
};

const props = {
  mostTravelledDest: jest.fn(),
  mostTravelledMsg: "Message",
  mostVisitedMsg: "Message",
};

const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);

describe("Most travelled Component test", () => {
  let wrapper;
  let store;
  store = mockStore(state);
  wrapper = mount(<MostTravelled store={store} {...props} />);
  test("it should render component", () => {
    const component = findByAttr(wrapper, "mostVisited");
    expect(component.length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
});
