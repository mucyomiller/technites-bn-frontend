/* eslint-disable consistent-return */
import {
  GET_ALL_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_SEEN,
  TOOGLE_NOTIFICATION_PANE,
  MARK_ONE_NOTIFICATION_SEEN,
} from "./actionType";
import {
  getNotificationsReq,
  markAllReadReq,
  markOneReadReq,
} from "../../services/notificationServices";

export const getNotifications = () => async (dispatch) => {
  const notifs = await getNotificationsReq();
  dispatch({
    type: GET_ALL_NOTIFICATIONS,
    notifications: notifs,
  });
};
export const markAllRead = () => async (dispatch) => {
  const res = await markAllReadReq();
  dispatch({
    type: MARK_ALL_NOTIFICATIONS_SEEN,
    notMessage: res,
  });
};

export const markOneRead = (id) => async (dispatch) => {
  const data = await markOneReadReq(id);
  dispatch({
    type: MARK_ONE_NOTIFICATION_SEEN,
    payload: data,
  });
};

export const toggleNotPane = () => (dispatch) => {
  dispatch({
    type: TOOGLE_NOTIFICATION_PANE,
    notPanedisplay: true,
  });
};
