/* eslint-disable comma-dangle */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import React, { cloneElement } from "react";
import thunk from "redux-thunk";
import axios from "axios";
import moxios from "moxios";
import MockAdapter from "axios-mock-adapter";
import Enzyme, { mount, shallow } from "enzyme";
import { Route, MemoryRouter, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16/build";
import Select from "../../../components/select/Select";
import Counter from "../../../components/counter/Counter";
import { RequestPage, mapStateToProps as mapStateToPropsNew } from '../../../components/request-page/RequestPage';
import SingleRequest, { SingleRequest as SingleRequestComponent, mapStateToProps } from '../../../components/single-request/SingleRequest';
import ImageContainer from '../../../components/image-container/ImageContainer';

const mocks = {
  subscribe: () => jest.fn(),
  dispatch: () => jest.fn(),
  getAccomodations: () => jest.fn(),
  getRooms: () => jest.fn(),
  getUserRequests: () => jest.fn(),
};
const store = (state) => ({
  getState: () => state,
  setState: () => state,
  ...mocks
});

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

describe("<request page />", () => {
  const props = {
    requests: {
      requests: [
        {
          id: 1,
          user_id: 10,
          request_type: "ReturnTrip",
          location_id: 1,
          departure_date: "2019-11-25",
          passport_name: "amily",
          passport_number: "1234567890",
          return_date: "2019-11-30",
          destinations: [
            {
              check_in: "2019-11-26",
              check_out: "2019-11-29",
              destination_id: 1,
              accomodation_id: 1
            },
            {
              check_in: "2019-11-26",
              check_out: "2019-11-29",
              destination_id: 4,
              accomodation_id: 7
            }
          ],
          reason: "visit some where jiggle",
          status: "Pending",
          createdAt: "2019-11-20T18:36:05.615Z",
          updatedAt: "2019-11-21T08:44:59.595Z"
        }
      ],
      accomodations: {
        accomodations: {
          data: {
            data: [
              {
                id: 1,
                accommodation_name: "Kigali Marriott Hotel",
                room_type: null,
                description: null,
                location: 4,
                images: null,
                quantity: null,
                services: null,
                amenities: null,
                available_space: 10,
                owner: null,
                createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
                updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
              }
            ]
          }
        },
        accomodationFound: true,
        requestFound: false,
        requests: [],
        rooms: [],
      },
      rooms: {
        accomodations: {
          data: {
            data: [
              {
                id: 1,
                accommodation_name: "Kigali Marriott Hotel",
                room_type: null,
                description: null,
                location: 4,
                images: null,
                quantity: null,
                services: null,
                amenities: null,
                available_space: 10,
                owner: null,
                createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
                updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
              },
              {
                id: 2,
                accommodation_name: " Kigali Serena Hotel",
                room_type: null,
                description: null,
                location: 5,
                images: null,
                quantity: null,
                services: null,
                amenities: null,
                available_space: 10,
                owner: null,
                createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
                updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
              },
              {
                id: 3,
                accommodation_name: "Kigali Radisson Blu Hotel",
                room_type: null,
                description: null,
                location: 1,
                images: null,
                quantity: null,
                services: null,
                amenities: null,
                available_space: 10,
                owner: null,
                createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
                updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
              },
              {
                id: 4,
                accommodation_name: "Four Seasons Hotel",
                room_type: null,
                description: null,
                location: 2,
                images: null,
                quantity: null,
                services: null,
                amenities: null,
                available_space: 10,
                owner: null,
                createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
                updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
              },
            ]
          }
        },
        accomodationFound: true,
        requestFound: false,
        requests: [],
        rooms: {
          data: {
            data: [
              {
                id: 3,
                accommodation_id: 2,
                name: "Room3",
                room_type: "studio",
                description: "This is a very good room",
                cost: 100,
                images: [
                  {
                    image_url: "http://res.cloudinary.com/technites/image/upload/v1570628696/luxvju7a9rxarnsyrhwo.jpg"
                  },
                  {
                    image_url: "http://res.cloudinary.com/technites/image/upload/v1570628699/gqfczqwgjj33sdv2bmq0.jpg"
                  },
                  {
                    image_url: "http://res.cloudinary.com/technites/image/upload/v1570628701/krlafnosukdnrp3ic8nb.jpg"
                  }
                ],
                status: true,
                createdAt: "2019-11-19T21:53:27.054Z",
                updatedAt: "2019-11-19T21:53:27.054Z"
              },
              {
                id: 4,
                accommodation_id: 2,
                name: "Room4",
                room_type: "single",
                description: "This is a very good room",
                cost: 200,
                images: [
                  {
                    image_url: "http://res.cloudinary.com/technites/image/upload/v1570628696/luxvju7a9rxarnsyrhwo.jpg"
                  },
                  {
                    image_url: ""
                  },
                  {
                    image_url: "http://res.cloudinary.com/technites/image/upload/v1570628701/krlafnosukdnrp3ic8nb.jpg"
                  }
                ],
                status: true,
                createdAt: "2019-11-19T21:53:27.054Z",
                updatedAt: "2019-11-19T21:53:27.054Z"
              }
            ]
          }
        },
      }

    },
    createRequest: jest.fn(),
    deleteRequest: jest.fn(),
    editRequest: jest.fn(),
    getUserRequests: jest.fn(),
    getAccomodations: jest.fn(),
    getRooms: jest.fn(),
    match: {
      params: { id: 1 }
    },
    history: {
      replace: jest.fn()
    },
    accomodations: {
      accomodations: {
        data: {
          data: [
            {
              id: 1,
              accommodation_name: "Kigali Marriott Hotel",
              room_type: null,
              description: null,
              location: 4,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 2,
              accommodation_name: " Kigali Serena Hotel",
              room_type: null,
              description: null,
              location: 5,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 3,
              accommodation_name: "Kigali Radisson Blu Hotel",
              room_type: null,
              description: null,
              location: 1,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 4,
              accommodation_name: "Four Seasons Hotel",
              room_type: null,
              description: null,
              location: 2,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 5,
              accommodation_name: "EKO Hotels & Suites",
              room_type: null,
              description: null,
              location: 3,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 6,
              accommodation_name: "Mary Hotel",
              room_type: null,
              description: null,
              location: 3,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 7,
              accommodation_name: "New Hotel",
              room_type: null,
              description: null,
              location: 4,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 8,
              accommodation_name: "Miami Hotel",
              room_type: null,
              description: null,
              location: 5,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 9,
              accommodation_name: "Gorrilla Park",
              room_type: null,
              description: null,
              location: 1,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 10,
              accommodation_name: "Star light",
              room_type: null,
              description: null,
              location: 2,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            }
          ]
        }
      },
      accomodationFound: true,
      requestFound: false,
      requests: [],
      rooms: [],
    },
    rooms: {
      accomodations: {
        data: {
          data: [
            {
              id: 1,
              accommodation_name: "Kigali Marriott Hotel",
              room_type: null,
              description: null,
              location: 4,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 2,
              accommodation_name: " Kigali Serena Hotel",
              room_type: null,
              description: null,
              location: 5,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 3,
              accommodation_name: "Kigali Radisson Blu Hotel",
              room_type: null,
              description: null,
              location: 1,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 4,
              accommodation_name: "Four Seasons Hotel",
              room_type: null,
              description: null,
              location: 2,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 5,
              accommodation_name: "EKO Hotels & Suites",
              room_type: null,
              description: null,
              location: 3,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 6,
              accommodation_name: "Mary Hotel",
              room_type: null,
              description: null,
              location: 3,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 7,
              accommodation_name: "New Hotel",
              room_type: null,
              description: null,
              location: 4,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 8,
              accommodation_name: "Miami Hotel",
              room_type: null,
              description: null,
              location: 5,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 9,
              accommodation_name: "Gorrilla Park",
              room_type: null,
              description: null,
              location: 1,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            },
            {
              id: 10,
              accommodation_name: "Star light",
              room_type: null,
              description: null,
              location: 2,
              images: null,
              quantity: null,
              services: null,
              amenities: null,
              available_space: 10,
              owner: null,
              createdAt: "2019 - 11 - 19T21: 53: 27.050Z",
              updatedAt: "2019 - 11 - 19T21: 53: 27.050Z"
            }
          ]
        }
      },
      accomodationFound: true,
      requestFound: false,
      requests: [],
      rooms: {
        data: {
          data: [
            {
              id: 3,
              accommodation_id: 2,
              name: "Room3",
              room_type: "studio",
              description: "This is a very good room",
              cost: 100,
              images: [
                {
                  image_url: "http://res.cloudinary.com/technites/image/upload/v1570628696/luxvju7a9rxarnsyrhwo.jpg"
                },
                {
                  image_url: "http://res.cloudinary.com/technites/image/upload/v1570628699/gqfczqwgjj33sdv2bmq0.jpg"
                },
                {
                  image_url: "http://res.cloudinary.com/technites/image/upload/v1570628701/krlafnosukdnrp3ic8nb.jpg"
                }
              ],
              status: true,
              createdAt: "2019-11-19T21:53:27.054Z",
              updatedAt: "2019-11-19T21:53:27.054Z"
            },
            {
              id: 4,
              accommodation_id: 2,
              name: "Room4",
              room_type: "single",
              description: "This is a very good room",
              cost: 200,
              images: [
                {
                  image_url: "http://res.cloudinary.com/technites/image/upload/v1570628696/luxvju7a9rxarnsyrhwo.jpg"
                },
                {
                  image_url: ""
                },
                {
                  image_url: "http://res.cloudinary.com/technites/image/upload/v1570628701/krlafnosukdnrp3ic8nb.jpg"
                }
              ],
              status: true,
              createdAt: "2019-11-19T21:53:27.054Z",
              updatedAt: "2019-11-19T21:53:27.054Z"
            }
          ]
        }
      },
    },
    currentUser: {
      auto_fill: true
    }
  }

  const state = {
    data: { destinations: [{}] },
    errors: {},
    counter: { animation: "", count: 0 },
    cities: [
      { id: 0, name: "Choose a country" },
      { id: 1, name: "Kigali" },
      { id: 2, name: "New York" },
      { id: 3, name: "Lagos" },
      { id: 4, name: "Dubai" },
      { id: 5, name: "Kinshasa" }
    ],
    accomodations: [{ id: 0, name: "Choose an accomodation" }],
    currentAccomodations: [{ id: 0, name: "Choose an accomodation" }],
    rooms: [{ id: 0, name: "Choose a room" }],
    currentRooms: [{ id: 0, name: "Choose a room" }],
    profile: { user: { auto_fill: true } },
  };

  const initialStore = store({
    // Request: props,
    accomodations: props.requests.accomodations,
    rooms: props.requests.rooms,
    Requests: props.requests,
    profile: { user: { id: 1, firstname: 'name', lastname: "name" } }
  });

  it('it should mount the request page', () => {
    const state = mapStateToProps({ profile: { user: {} } });
    wrapper = shallow(<RequestPage {...props} />);
  });

  it('it should test for the populate request page', () => {
    wrapper = shallow(<SingleRequestComponent {...props} />);
    wrapper.setProps({ user: {} });
  });

  it('should test for the new request', () => {
    props.match.params.id = "new";
    wrapper = shallow(<RequestPage {...props} />);
  });

  it('should test for the invalid id when populating the request', () => {
    props.match.params.id = 32;
    wrapper = shallow(<RequestPage {...props} />);
  });

  it('should test for submit a request if the data is invalid', () => {
    props.match.params.id = "new";

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    const button = wrapper.find('button[className="button"]').first();
    button.simulate('click');

    const checkbox = wrapper.find('input[type="checkbox"]');
    checkbox.simulate('change', { target: { checked: true } });
  });

  it('should test for submit a request', () => {
    props.match.params.id = "new";

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    const button = wrapper.find('button[className="button"]').first();
    button.simulate('click');
  });

  it('should test for submit a multi city request', () => {
    props.match.params.id = "new";

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    const button = wrapper.find('button[className="button"]').at(1);
    button.simulate('click');
  });

  it('should test for editing a request', () => {
    props.match.params.id = 1;

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    const button = wrapper.find('button[className="button"]').first();
    button.simulate('click');
  });

  it('should test for delete a request', () => {
    props.match.params.id = 1;

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    const button = wrapper.find('button[className="button"]').at(1);
    button.simulate('click');
  });

  it('should test for back button', () => {
    props.match.params.id = 1;

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    state.counter.count = 1;
    wrapper.setState(state);
    const button = wrapper.find('button[className="button"]').first();
    button.simulate('click');
  });

  it('should test for forward button', () => {
    props.match.params.id = 1;

    const data = {
      request_type: 'OneWay',
      location_id: 1,
      departure_date: "2025-11-17",
      reason: "visit to cairo",
      passport_name: "some",
      passport_number: 1234567890,
      destination_id: 3,
      accomodation_id: 5,
      room_id: 9,
      check_in: "2029-09-26",
      check_out: "2029-09-27",
      destinations: [
        {
          destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
        }],
    };

    wrapper = shallow(<RequestPage {...props} />);
    wrapper.setState(state);
    wrapper.setState({ data });
    state.counter.count = 1;

    state.data.destinations.push(
      {
        destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
      }
    );
    state.data.destinations.push(
      {
        destination_id: 3, accomodation_id: 5, room_id: 9, check_in: "2029-09-26", check_out: "2029-09-27"
      }
    );
    wrapper.setState(state);
    const button = wrapper.find('button[className="button"]').at(1);
    button.simulate('click');
  });

  it('should test for setting state to props in request page', () => {
    // mapStateToPropsNew({ Requests: {}, accomodations: {}, rooms: {}, currentUser: { profile: { user: { auto_fill: true } } } });
    mapStateToPropsNew(state);
  });

  it('should test select element', () => {
    const selectProps = {
      name: '',
      value: '',
      label: '',
      type: 'text',
      options: [{ id: 1, name: '' }],
      onChange: jest.fn(),
      error: '',
    };

    shallow(<Select {...selectProps} />);
  });

  it('should test counter element', () => {
    const counterProps = {
      animation: 'animation',
      count: 0,
    };

    shallow(<Counter {...counterProps} />);
  });

  it("should check if the input field are being rendered", () => {
    const destinations = [
      { id: 0, name: "Choose a country" },
      { id: 1, name: "Kigali" },
    ];

    const accomodations = [
      { id: 0, name: "Choose an accomodation" },
      { id: 1, name: "Hotel" },
    ];

    const requestPage = mount(<RequestPage {...props} />);
    const destinationSelect = requestPage.find('select[name="destination_id"]');
    destinationSelect.simulate('change', destinations[1]);

    const accomodationSelect = requestPage.find('select[name="accomodation_id"]');
    accomodationSelect.simulate('change', accomodations[1]);
  });

  it("should test the image container", () => {
    const imageProps = {
      images: [
        { images: { image1: '', image2: '' } },
        { images: { image1: '', image2: '' } },
      ]
    };

    const requestPage = mount(<ImageContainer {...imageProps} />);
  });
});
