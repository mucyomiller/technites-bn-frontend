/* eslint-disable import/prefer-default-export */
import * as actions from "./actionType";
import httpservice from "../../services/httpServices";

export const resetHostPassword = (data) => async (dispatch) => {
  try {
    const response = await httpservice.dbCall.patch("/hosts/reset", data);
    dispatch({
      type: actions.RESET_HOST,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: actions.GET_ERRORS,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
