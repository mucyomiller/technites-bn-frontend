/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import TripStatsComponent, {
  TripStats,
} from "../../../components/tripStats/tripStats";
const mockStore = configureStore([thunk]);
const data = {
  createdAt: "2019-11-13T10:07:21.401Z",
  id: 8,
  message: "visit nairobi",
  request_id: 12,
  seen: "false",
  type: "ReturnTrip",
  updatedAt: "2019-11-15T13:13:44.347Z",
  user_id: 49,
  notPaneDisplay: false,
};
const onSubmit = sinon.spy();
const props = {
  tripsStat: jest.fn(),
};
const state = {
  profile: {
    user: data
  },
  notifications: {
    token: {
      id: 1,
    },
  },
};
const findByAttr = (wrapper, name) => wrapper.find(`[name="${name}"]`);
describe("Single Trip component", () => {
  let wrapper;
  let wrapper2;
  let store;
  store = mockStore(state);
  wrapper2 = mount(
    <Provider store={store}>
      <TripStatsComponent onSubmit={onSubmit} {...props} />
    </Provider>,
  );
  wrapper = mount(<TripStats store={store} onSubmit={onSubmit} {...props} />);
  test("it should render component", () => {
    expect(wrapper.length).toBe(1);
  });
  it("should check if data are valid when you send the data without typing", () => {
    const button = wrapper.find("button");
    button.simulate("submit");
    expect(wrapper.length).toBe(1);
  });
  it("should test input components", () => {
    const inputYears = findByAttr(wrapper, "years")
    inputYears.simulate("change");
    const inputMonths = findByAttr(wrapper, "months")
    inputMonths.simulate("change");
    const inputDays = findByAttr(wrapper, "days")
    inputDays.simulate("change");
  })
});
