/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import SingleTrip from "../../../components/tripStats/singleTrip";
import initialState from "../../../redux/reducers/initialState";

const mockStore = configureStore([thunk]);

const props = {
  requestType: "",
  location: "",
  depDate: "",
  retDate: "",
  reason: "",
  destinations: [{
    room_id: 2,
    check_in: "2017-09-26",
    check_out: "2018-09-27",
    destination_id: 5,
    accomodation_id: 1,
  }],
};
const props2 = {
  requestType: "",
  location: "",
  depDate: "",
  retDate: "",
  reason: "",
  destinations: undefined,
};

const findByAttr = (wrapper, dataTest) => wrapper.find(`[data-test="${dataTest}"]`);
describe("Single Trip component", () => {
  let wrapper;
  let wrapper2;
  let store;
  store = mockStore(initialState);
  wrapper = shallow(<SingleTrip store={store} {...props} />);
  wrapper2 = shallow(<SingleTrip store={store} {...props2} />);

  test("it should render component", () => {
    const component = findByAttr(wrapper, "destinations");
    expect(component.length).toBe(1);
    expect(wrapper.length).toBe(1);
  });
  test("should not render if no destinations are provided", () => {
    expect(wrapper2.length).toBe(1);
  });
});
