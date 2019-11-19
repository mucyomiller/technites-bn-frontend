import notificationReducer from "../../../redux/reducers/notificationReducer";
import {
  TOOGLE_NOTIFICATION_PANE,
  GET_ALL_NOTIFICATIONS,
  MARK_ONE_NOTIFICATION_SEEN,
  MARK_ALL_NOTIFICATIONS_SEEN,
} from "../../../redux/actions/actionType";
import initialState from "../../../redux/reducers/initialState";

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


const state = {
  ...initialState,
  notifications: [
    {
      id: 8,
      message: "visit nairobi",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
    },
    {
      id: 9,
      message: "visit nairobi",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
    },
    {
      id: 10,
      message: "visit nairobi",
      request_id: 12,
      seen: "false",
      type: "ReturnTrip",
      updatedAt: "2019-11-15T13:13:44.347Z",
      user_id: 49,
    },
  ],
};
test("should mark one notification as read", () => {
  const action = {
    type: MARK_ONE_NOTIFICATION_SEEN,
    payload: data,
  };
  const response = notificationReducer(state, action);
  expect(response.notificationCount).toBe(-1);
  expect(response.notifications.length).toBe(2);
});

test("should get all notifications for a user", () => {
  const action = {
    type: MARK_ALL_NOTIFICATIONS_SEEN,
    payload: data,
  };
  const response = notificationReducer(state, action);
  expect(response.notifications.length).toBe(0);
});
test("should get all notifications for a user", () => {
  const action = {
    type: GET_ALL_NOTIFICATIONS,
    notifications: state.notifications,
  };
  const response = notificationReducer(state, action);
  expect(response.notifications.length).toBe(6);
});

test("should toggle notification display", () => {
  const action = {
    type: TOOGLE_NOTIFICATION_PANE,
    notPanedisplay: true,
  };
  const response = notificationReducer(state, action);
  expect(response.notPaneDisplay).toBe(true);
});

test("should return default", () => {
  const response = notificationReducer(state, "blue");
  expect(response).toBe(state);
});
test("initial state stye", () => {
  expect(initialState).toBeTruthy();
});

test("should return default", () => {
  const response = notificationReducer("state", "blue");
  expect(response).toBe("state");
  expect(initialState.notifications.length).toBe(0);
});
