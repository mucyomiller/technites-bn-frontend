/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16/build";
import { Provider } from "react-redux";
import UserRequests, {
  UserRequests as UserRequestsComponent,
} from "../../../components/user-requests/UserRequests";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";

Enzyme.configure({ adapter: new Adapter() });
const store = configureStore([thunk])();
const props = {
  errors: {},
  getUserRequests: jest.fn(),
  requests: {
    requestFound: true,
    requests: [
      {
        id: 8,
        user_id: 9,
        request_type: "OneWay",
        location_id: 3,
        departure_date: "2019-11-16",
        return_date: null,
        destinations: [
          {
            room_id: 2,
            check_in: "2019-11-18T15:16:38.447Z",
            check_out: "2019-12-27T15:16:38.447Z",
            destination_id: 4,
            accomodation_id: 1,
          },
        ],
        reason: "Visit Lagos",
        status: "Pending",
        createdAt: "2019-11-11T06:53:54.602Z",
        updatedAt: "2019-11-11T06:53:54.602Z",
      },
    ],
  },
};

describe("User Requests View", () => {
  const component = mount(
    <UserRequestsComponent {...props} history={{ push: jest.fn() }} />,
  );
  it("should render User Request View without crashing", () => {
    expect(component).toHaveLength(1);
  });
  it(" should trigger componentWillReceiveProps in User Requests view", () => {
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps errors case in User Requests view", () => {
    props.errors.error = "Test error";
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
});
describe("User Requests View mapStateToProps", () => {
  it("should cover mapStateToProps errors case in User Requests view", () => {
    const component = mount(<UserRequestsComponent {...props} history={{ push: jest.fn() }} />);
    const nextPropsError = { successresponse };
    component.setProps(nextPropsError);
  });
});
