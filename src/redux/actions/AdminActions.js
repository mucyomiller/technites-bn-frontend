/* eslint-disable import/prefer-default-export */
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";

export const addHost = (data) => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.post("/hosts", data);
    dispatch({
      type: actions.ADD_HOST,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
