/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";

export const getUserRequests = requests => async dispatch => {
  try {
    const response = await httpservice.dbCall.get("/requests");
    switch (requests) {
      case "Pending":
        dispatch({
          type: actions.GET_PENDING_REQUESTS,
          payload: response.data.data
        });
        break;
      case "Past":
        dispatch({
          type: actions.GET_PAST_REQUESTS,
          payload: response.data.data
        });
        break;
      default:
        dispatch({
          type: actions.GET_REQUESTS,
          payload: response.data.data
        });
    }
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message
    });
  }
};

export const getMyUsersRequests = requests => async dispatch => {
  try {
    const response = await httpservice.dbCall.get("/requests/manager");
    switch (requests) {
      case "Pending":
        dispatch({
          type: actions.GET_PENDING_REQUESTS,
          payload: response.data.data
        });
        break;
      case "Past":
        dispatch({
          type: actions.GET_PAST_REQUESTS,
          payload: response.data.data
        });
        break;
      default:
        dispatch({
          type: actions.GET_ALL_REQUESTS,
          payload: response.data.data
        });
    }
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message
    });
  }
};

export const approveReject = (data, action, status) => async dispatch => {
  try {
    await httpservice.dbCall.get(`/requests/${data.id}/${action}`);
    dispatch({
      type: actions.REQUEST_ACTION,
      response: { action, data, status }
    });
    toast.success(`Request succesfully ${status}`);
  } catch (error) {
    toast.error(error.message);
  }
};
