/* eslint-disable import/prefer-default-export */
import {
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  RETRIEVE_USERS_SUCCESS,
  RETRIEVE_USERS_FAIL,
} from "./actionType";
import httpservice from "../../services/httpServices";

export const retrieveUsers = () => async (dispatch) => {
  try {
    const res = await httpservice.dbCall.get("/users");
    dispatch({
      type: RETRIEVE_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: RETRIEVE_USERS_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};

export const addRole = (role, email) => async (dispatch) => {
  try {
    const data = {
      new_role: role,
      email,
    };
    const res = await httpservice.dbCall.put("/admin/users", data);
    dispatch({
      type: ADD_ROLE_SUCCESS,
      payload: res.data.data,
    });
    dispatch(retrieveUsers());
  } catch (error) {
    dispatch({
      type: ADD_ROLE_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};
