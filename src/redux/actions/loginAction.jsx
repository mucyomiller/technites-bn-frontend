/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import { toast } from "react-toastify";
import { LOGIN, SET_TOKEN } from "./actionType";
import history from "../../services/history";
import { authLogin } from "../../services/authServices";

export const loginSuccess = response => ({ type: LOGIN, response });

export const setToken = token => ({ type: SET_TOKEN, token });

export const loginUser = data => async dispatch => {
  try {
    const response = await authLogin(data);
    await dispatch(setToken(response.data.token));
    await dispatch(loginSuccess(response));
    history.push("/dashboard");
    toast.success("Login successful");
  } catch (error) {
    if (error.message === "Network Error") {
      toast.error(error.message);
    }
    toast.error("Invalid credentials");
  }
};
