/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";
import { getMostTravelled, getTripStats } from "../../services/requestServices";

export const getUserRequests = (requests) => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests");
    switch (requests) {
      case "Pending":
        dispatch({
          type: actions.GET_PENDING_REQUESTS,
          payload: response.data.data,
        });
        break;
      case "Past":
        dispatch({
          type: actions.GET_PAST_REQUESTS,
          payload: response.data.data,
        });
        break;
      default:
        dispatch({
          type: actions.GET_REQUESTS,
          payload: response.data.data,
        });
    }
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const getMyUsersRequests = (requests) => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests/manager");
    switch (requests) {
      case "Pending":
        dispatch({
          type: actions.GET_PENDING_REQUESTS,
          payload: response.data.data,
        });
        break;
      case "Past":
        dispatch({
          type: actions.GET_PAST_REQUESTS,
          payload: response.data.data,
        });
        break;
      default:
        dispatch({
          type: actions.GET_ALL_REQUESTS,
          payload: response.data.data,
        });
    }
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const approveReject = (data, action, status) => async (dispatch) => {
  try {
    await httpservice.dbCall.get(`/requests/${data.id}/${action}`);
    dispatch({
      type: actions.REQUEST_ACTION,
      response: { action, data, status },
    });
    toast.success(`Request succesfully ${status}`);
  } catch (error) {
    toast.error(error.message);
  }
};

export const setAutoFill = (value) => async (dispatch) => {
  try {
    await httpservice.dbCall.patch(`/requests/remember/${value}`);
    toast.success(`Remember personal details ${value ? "turned on" : "turned off"}`);
  } catch (error) {
    toast.error("oops something unexpected happened!");
  }
}
export const mostTravelled = () => async (dispatch) => {
  try {
    const res = await getMostTravelled();
    dispatch({
      type: actions.MOST_VISITED,
      payload: res.message,
    });
  } catch (error) {
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error);
    }
    if (!error.response && error.message) {
      toast.error(error.message);
    }
  }
};

export const tripsStatsAction = (id, years, months, days) => async (dispatch) => {
  try {
    const res = await getTripStats(id, years, months, days);
    dispatch({
      type: actions.TRIPS_STATS,
      payload: res.data,
      totalTrips: res.totalTrips,
    });
  } catch (error) {
    if (error.response && error.response.data.error) {
      toast.error(error.response.data.error);
    }
    if (!error.response && error.message) {
      toast.error(error.message);
    }
  }
};
