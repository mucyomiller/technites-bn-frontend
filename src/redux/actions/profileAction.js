/* eslint-disable import/prefer-default-export */
import {
  RETRIEVE_PROFILE,
  UPDATE_PROFILE,
  RETRIEVE_FAIL,
  UPDATE_FAIL,
} from "./actionType";
import httpservice from "../../services/httpServices";
import { getCurrentUser } from "../../services/authServices";

export const retrieveProfile = () => async (dispatch) => {
  try {
    const user = getCurrentUser();
    const res = await httpservice.dbCall.get(`/users/${user.id}`);
    dispatch({
      type: RETRIEVE_PROFILE,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: RETRIEVE_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await httpservice.dbCall.patch("/users/editprofile", data);
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload: error.response.data,
    });
  }
};
