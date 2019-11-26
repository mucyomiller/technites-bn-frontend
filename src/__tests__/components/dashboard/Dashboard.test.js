/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../../../components/dashboard/Dashboard";

const mockStore = configureStore([thunk]);

const state = {
  Requests: {
    trips: [
      {
        id: 1,
        requestType: "",
        location: "",
        depDate: "",
        retDate: "",
        reason: "",
        destinations: [
          {
            room_id: 2,
            check_in: "2017-09-26",
            check_out: "2018-09-27",
            destination_id: 5,
            accomodation_id: 1,
          },
        ],
      },
    ],
    totalTrips: 1,
  },
  notifications: {
    notPaneDisplay: true,
    notifications: [],
    token: {
      id: 1,
    },
  },
  loginState: {
    isAuthenticated: true,
  },
  profile: {
    user: {},
  },
  displayNots: false,
};

const props = {
  displayNots: false,
};
const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);
describe("Dashboard Trip component", () => {
  let wrapper;
  let store;

  store = mockStore(state);
  wrapper = mount(
    <Provider store={store} {...props}>
      <BrowserRouter>
        <Dashboard store={store} {...props} />
      </BrowserRouter>
    </Provider>,
  );

  test("it should render component", () => {
    expect(wrapper.length).toBe(1);
  });
  test("test display without trips", () => {
    state.Requests.trips = undefined;
    state.Requests.totalTrips = 0;
    store = mockStore(state);
    const wrapper2 = mount(
      <Provider store={store} {...props}>
        <BrowserRouter>
          <Dashboard store={store} {...props} />
        </BrowserRouter>
      </Provider>,
    );
    expect(wrapper2.length).toBe(1);
  });
});
