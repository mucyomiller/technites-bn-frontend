import { GET_REQUESTS } from '../actions/actionType';
import IsEmpty from '../../validation/IsEmpty';

const initialState = {
  requestFound: false,
  requests: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS:
      return {
        ...state,
        requestFound: !IsEmpty(action.payload),
        requests: action.payload,
      };
    default:
      return state;
  }
}
