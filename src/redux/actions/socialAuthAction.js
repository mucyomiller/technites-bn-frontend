import { SOCIAL_LOGIN_SUCCESS, SET_TOKEN } from "./actionType";
import history from "../../services/history";
import { setJwtToLocalStorage } from "../../services/authServices";

export const setToken = (token) => ({ type: SET_TOKEN, token });

export const socialAuthSuccess = (payload) => ({ type: SOCIAL_LOGIN_SUCCESS, payload });

export const socialAuthAction = (payload) => async (dispatch) => {
  setJwtToLocalStorage(payload.token);
  dispatch(setToken(payload.token));
  dispatch(socialAuthSuccess(payload));
  history.push("/dashboard");
};
