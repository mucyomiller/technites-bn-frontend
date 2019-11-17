/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";

export const getUserRequests = () => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests");
    dispatch({
      type: actions.GET_REQUESTS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMyUsersRequests = () => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests/manager");
    dispatch({
      type: actions.GET_ALL_REQUESTS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response.data,
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
