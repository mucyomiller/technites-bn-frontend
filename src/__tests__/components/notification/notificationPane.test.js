/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import notificationPane, {
  NotificationPane,
  mapStateToProps
} from "../../../components/notification/notificationPane";
import initialState from "../../../redux/reducers/initialState";

const mockStore = configureStore([thunk]);
const state = {
  profile: {
    user: {
      id: 10
    }
  },
  type: "type",
  message: "messge",
  seen: false,
  notificationCount: 1,
  key: 1,
  requestId: 2,
  notId: 3,
  markThisRead: jest.fn(),
  toggleNotDisplay: jest.fn(),
  getUser: jest.fn(),
  notPaneDisplay: false,
  isAuthenticated: false,
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
      notPaneDisplay: false
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
      notPaneDisplay: false
    }
  ]
};

const props = {
  isAuthenticated: true,
  toggleNotDisplay: jest.fn(),
  notPaneDisplay: false,
  loadNotifications: jest.fn(),
  notifications: state.notifications,
  markRead: jest.fn(),
  displayNots: false,
  getUser: jest.fn(),
  setAutoFill: jest.fn()
};

const findByAttr = (wrapper, dataTest) =>
  wrapper.find(`[data-test="${dataTest}"]`);

describe("Notification pane", () => {
  let wrapper;
  let store;
  store = mockStore(initialState);
  wrapper = shallow(<NotificationPane store={store} {...props} />);
  test("Should render the different component", () => {
    wrapper.simulate("click");
  });

  test("should toggle Notification pane on click", () => {
    const markReadButton = findByAttr(wrapper, "mark-read-button");
    expect(markReadButton.length).toBe(1);
    wrapper.simulate("click");
    expect(wrapper.instance().props.displayNots).toBeFalsy();
  });
  test("should toggle Notification pane on click", () => {
    const closeButton = findByAttr(wrapper, "close-icon").first();
    expect(closeButton.length).toBe(1);
    closeButton.simulate("click");
  });

  test("test no notif display", () => {
    const newProps = { ...props, notification: [] };
    wrapper = shallow(<NotificationPane store={store} {...newProps} />);
    const noNotifText = findByAttr(wrapper, "text-no-notifs");
  });

  test("Tests map state to props", () => {
    const initialState = {
      notifications: {
        notifications: [],
        notPaneDisplay: false
      },
      loginState: {
        isAuthenticated: true
      },
      profile: {
        user: {
          id: 10
        },
      }
    };

    expect(mapStateToProps(initialState).user.id).toEqual(10);
  });
});
