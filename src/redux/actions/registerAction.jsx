/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import { toast } from "react-toastify";
import { REGISTER } from "./actionType";
import { authRegister } from "../../services/authServices";

export const register = data => async dispatch => {
  try {
    const response = await authRegister(data);
    dispatch({
      type: REGISTER,
      payload: response
    });

    window.location.href = "/verify";
    // toast.success("Registered successfully");
  } catch (error) {
    console.log(">>>>>> there is an error: ", error);
    if (error.response.data.error instanceof Array) {
      toast.error(`${error.response.data.error[0].msg}`);
    }

    toast.error(error.response.data.error);
  }
};
