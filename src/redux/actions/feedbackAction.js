/* eslint-disable import/prefer-default-export */
import {
  RETRIEVE_FEEDBACK_SUCCESS,
  RETRIEVE_FEEDBACK_FAIL,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAIL,
} from "./actionType";

import httpservice from "../../services/httpServices";

export const retrieveFeedback = (accommodationId) => async (dispatch) => {
  try {
    const res = await httpservice.dbCall.get(`/accommodations/${accommodationId}/feedbacks`);
    dispatch({
      type: RETRIEVE_FEEDBACK_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: RETRIEVE_FEEDBACK_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};

export const submitFeedback = (accommodationId, data) => async (dispatch) => {
  try {
    const payload = { feedback: data };
    const res = await httpservice.dbCall.post(`/accommodations/${accommodationId}/feedbacks`, payload);
    dispatch({
      type: SUBMIT_FEEDBACK_SUCCESS,
      payload: res.data.data,
    });
    // re-retrieve datas
    dispatch(retrieveFeedback(accommodationId));
  } catch (error) {
    dispatch({
      type: SUBMIT_FEEDBACK_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};