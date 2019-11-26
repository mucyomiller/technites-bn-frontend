/* eslint-disable import/prefer-default-export */
// import { GET_REQUESTS, GET_ERRORS } from "./actionType";
import { toast } from "react-toastify";
import httpservice from "../../services/httpServices";
import { GET_ALL_ACCOMODATIONS } from "./actionType";

export const getAccomodations = () => async (dispatch) => {
  try {
    const response = await httpservice.get("/accommodations");
    dispatch({
      type: GET_ALL_ACCOMODATIONS,
      payload: response,
    });
  } catch (error) {
    // toast.error(error.response.data.error);
  }
};
