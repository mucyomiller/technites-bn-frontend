/* eslint-disable import/prefer-default-export */
// import { GET_REQUESTS, GET_ERRORS } from "./actionType";
import { toast } from "react-toastify";
import httpServices from "../../services/httpServices";
import { GET_ALL_ROOMS } from "./actionType";

export const getRooms = (id) => async (dispatch) => {
  try {
    const response = await httpServices.get(`/accommodations/${id}/rooms`);

    dispatch({
      type: GET_ALL_ROOMS,
      payload: response,
    });
  } catch (error) {
    // toast.error(error.response.data.error);
  }
};
