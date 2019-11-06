/* eslint-disable comma-dangle */
import {
  GET_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_SEEN,
  TOOGLE_NOTIFICATION_PANE,
  MARK_ONE_NOTIFICATION_SEEN
} from "../actions/actionType";
import initialState from "./initialState";

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.notifications],
        notificationCount: [...state.notifications, ...action.notifications].length
      };
    case MARK_ALL_NOTIFICATIONS_SEEN:
      return {
        ...state,
        notMessage: action.notMessage,
        notifications: initialState.notifications,
        notificationCount: 0
      };
    case MARK_ONE_NOTIFICATION_SEEN:
      return {
        ...state,
        notifications: [...state.notifications].filter((not) => not.id !== action.payload.id),
        notificationCount: state.notificationCount - 1
      };
    case TOOGLE_NOTIFICATION_PANE:
      return {
        ...state,
        notPaneDisplay: !state.notPaneDisplay
      };
    default:
      return state;
  }
};

export default notificationReducer;
