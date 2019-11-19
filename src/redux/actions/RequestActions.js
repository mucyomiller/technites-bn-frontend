/* eslint-disable import/prefer-default-export */
import { GET_REQUESTS, GET_ERRORS, GET_ALL_REQUESTS } from "./actionType";
import httpservice from "../../services/httpServices";

export const getUserRequests = () => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests");
    dispatch({
      type: GET_REQUESTS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const getMyUsersRequests = () => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.get("/requests/manager");
    dispatch({
      type: GET_ALL_REQUESTS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
