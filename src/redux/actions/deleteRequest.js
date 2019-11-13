/* eslint-disable import/prefer-default-export */
import { toast } from "react-toastify";
import httpservice from "../../services/httpServices";

export const deleteRequest = (id) => async (dispatch) => {
  try {
    const response = await httpservice.delete(`/requests/${id}`);
    toast.success(response.data.message);
    window.location.href = "/requests";
  } catch (error) {
    // toast.error(error.response.data.error);
  }
};
