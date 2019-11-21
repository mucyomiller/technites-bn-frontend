/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import moment from "moment";
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
    case actions.GET_PENDING_REQUESTS:
      const pendingRequests = action.payload.filter(
        (request) => request.status === "Pending",
      );
      return {
        ...state,
        requestFound: !IsEmpty(action.payload),
        requests: pendingRequests,
      };
    case actions.GET_PAST_REQUESTS:
      const pastRequests = action.payload.filter((request) => moment(request.departure_date).isBefore(new Date()));
      return {
        ...state,
        requestFound: !IsEmpty(action.payload),
        requests: pastRequests,
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
