/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import httpservice from "../../services/httpServices";
import { toast } from 'react-toastify';

export const rate = data => async dispatch => {
  try {
    await httpservice.dbCall.patch(`/accommodations/${data.id}/rating`, { rating: data.rate });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
