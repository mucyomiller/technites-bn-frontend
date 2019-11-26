/* eslint-disable import/prefer-default-export */
import {
  RETRIEVE_COMMENT,
  RETRIEVE_COMMENT_FAIL,
  SUBMIT_COMMENT,
  SUBMIT_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from "./actionType";
import httpservice from "../../services/httpServices";

export const retrieveComment = (requestId) => async (dispatch) => {
  try {
    const res = await httpservice.dbCall.get(`/requests/${requestId}/comments`);
    dispatch({
      type: RETRIEVE_COMMENT,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: RETRIEVE_COMMENT_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};

export const submitComment = (requestId, data) => async (dispatch) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const payload = { comment: data };
    const res = await httpservice.dbCall.post(`/requests/${requestId}/comments`, payload);
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data.data,
    });
    // re-retrieve datas
    dispatch(retrieveComment(requestId));
  } catch (error) {
    dispatch({
      type: SUBMIT_COMMENT_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};

export const deleteComment = (commentId, requestId) => async (dispatch) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await httpservice.dbCall.delete(`/requests/${requestId}/comments/${commentId}`);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response ? error.response.data : { error: error.message },
    });
  }
};