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
import { BrowserRouter as Router } from "react-router-dom";
import AdminRequests, {
  AdminRequests as AdminRequestsComponent,
} from "../../../components/admin-requests/AdminRequests";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";

Enzyme.configure({ adapter: new Adapter() });
const store = configureStore([thunk])();
const props = {
  user: {
    firstname: "Rugumbira",
    image_url: "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png",
  },
  postsPerPage: 4,
  currentPage: 1,
  errors: {},
  getMyUsersRequests: jest.fn(),
  retrieveProfile: jest.fn(),
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
        User: {
          image_url: "image",
          email: "usertest@gmail.com",
          phone: "123456",
          gender: "male",
          address: "address",
          country: "country",
          language: "language",
          company: "company",
          department: "department",
        },
      },
    ],
  },
};

describe("Admin Panel for viewing User Requests", () => {
  const component = mount(
    <Router>
      <AdminRequestsComponent {...props} history={{ push: jest.fn() }} />
    </Router>,
  );
  const component2 = shallow(
    <AdminRequestsComponent {...props} history={{ push: jest.fn() }} />,
  );
  it("should render Admin panel for Users Request View without crashing", () => {
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
  it(" should trigger componentWillReceiveProps in Admin Requests view", () => {
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps errors case in Admin Requests view", () => {
    const nextPropsError = {
      errors: {
        message: "This User has no request",
      },
      user: {
        role_value: 1,
      },
    };
    component2.setProps(nextPropsError);
    expect(component2).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps errors case when error doesn't exist in Admin Requests view", () => {
    const nextPropsSuccess = {
      user: {
        role_value: 4,
      },
      errors: {},
    };
    component2.setProps(nextPropsSuccess);
    expect(component2).toHaveLength(1);
  });
});

