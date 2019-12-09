/* eslint-disable array-callback-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import { toast } from "react-toastify";
import { PASSWORD_RESET, PASSWORD_CHANGE } from "./actionType";
import { passWordReset, passwordChange } from "../../services/authServices";

export const passWordResetAction = data => async dispatch => {
  try {
    const { destinations, request_type, ...resetData } = data;

    const response = await passWordReset(resetData);
    dispatch({
      type: PASSWORD_RESET,
      payload: response
    });
    toast.success('Reset link sent successfully')
    
  } catch (error) {
    if (error.response && error.response.data.errors) {
      toast.error(error.response.data.errors[0]);
    } else if (error.response && error.response.data.error) {
      toast.error(error.response.data.error);
    }
    if (!error.response && error.message) {
      toast.error(error.message);
    }
  }
};

export const passWordChangeAction = (data, token) => async dispatch => {
  try {
    if (data.password !== data.confirm_password) {
      throw Error("password and confirm passord do not match");
    }
    const { destinations, request_type, ...resetData } = data;

    const response = await passwordChange(resetData, token);
    dispatch({
      type: PASSWORD_CHANGE,
      payload: response
    });
    toast.success("password reset successful");
    window.location.assign("/login");
  } catch (error) {
    if (error.response && error.response.statusText) {
      toast.error(error.response.statusText);
    }
    if (error.response && error.response.data.errors) {
      error.response.data.errors.map(err => {
        toast.error(err);
      });
    }
    if (!error.response && error.message) {
      toast.error(error.message);
    }
  }
};
