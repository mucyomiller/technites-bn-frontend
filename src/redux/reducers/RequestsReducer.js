/* eslint-disable no-case-declarations */
import * as actions from "../actions/actionType";
import IsEmpty from "../../validation/IsEmpty";

const initialState = {
  requestFound: false,
  requests: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_REQUESTS:
      return {
        ...state,
        requestFound: !IsEmpty(action.payload),
        requests: action.payload,
      };
    case actions.GET_ALL_REQUESTS:
      return {
        ...state,
        requestFound: !IsEmpty(action.payload),
        requests: action.payload,
      };
    case actions.REQUEST_ACTION:
      const updatedRequests = state.requests.map((request) => (request.id === action.response.data.id
        ? { ...request, status: action.response.status }
        : request));

      return {
        ...state,
        requests: updatedRequests,
      };
    default:
      return state;
  }
}
