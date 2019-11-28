/* eslint-disable import/prefer-default-export */
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";

export const fetchAllMessages = () => async dispatch => {
  try {
    const response = await httpservice.dbCall.get("/users/chat");
    dispatch({
      type: actions.GET_ALL_MESSAGES,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message
    });
  }
};
