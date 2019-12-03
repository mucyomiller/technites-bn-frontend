/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomeNav from "../../../components/home-nav/HomeNav";

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
  loginState: {
    isAuthenticated: false,
  },
  notifications: [
    {
      createdAt: "2019-11-13T10:07:21.401Z",
      id: 8,
      message: "visit nairobi",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
      notPaneDisplay: false,
    },
    {
      createdAt: "2019-11-13T10:07:21.401Z",
      id: 9,
      message: "visit nairobi again",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
      notPaneDisplay: false,
    },
  ],
  profile: {
    user: {
      id: 5
    }
  }
};

const props = {
  isAuthenticated: true,
  toggleNotDisplay: jest.fn(),
  notPaneDisplay: false,
  loadNotifications: jest.fn(),
  notifications: state.notifications,
  markRead: jest.fn(),
  displayNots: false,
};

const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);

describe("Home Nav after login", () => {
  let wrapper;
  let store;
  store = mockStore(state);
  wrapper = shallow(<HomeNav store={store} {...props} />);
  test("Should render the different component", () => {
  });
  // test("test logout", () => {
  //   wrapper = mount(<Provider store={store} >
  //     <MemoryRouter>
  //       <HomeNav {...props} />
  //     </MemoryRouter>
  //   </Provider>);
  //   wrapper.find('Link a').first().props();
  //   wrapper.find('a[href="#"]').props().onClick()
  // });
});
