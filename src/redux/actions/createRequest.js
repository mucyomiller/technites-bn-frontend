/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
// import { GET_REQUESTS, GET_ERRORS } from "./actionType";
import { toast } from "react-toastify";
import httpservice from "../../services/httpServices";

export const createRequest = (data) => async (dispatch) => {
  try {
    const { destination_id, accomodation_id, room_id, check_in, check_out, ...requestData } = data;

    await httpservice.post("/requests", requestData);
    window.location.href = "/requests";
  } catch (error) {
    toast.error(error.response.data.error);
    toast.error(error.response.data.message);
  }
};
