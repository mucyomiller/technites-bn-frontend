/* eslint-disable no-fallthrough */
import { GET_ACCOMODATIONS, GET_ACCOMODATION, GET_RATE } from '../actions/actionType';
import initialState from '../store/initialState';

const accommodationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOMODATIONS:
      return { ...state, accommodations: action.accommodations };
    case GET_ACCOMODATION:
      return { ...state, accommodation: action.accommodation };
    case GET_RATE:
      return { ...state, averageRatings: action.payload };
    default:
      return state;
  }
};

export default accommodationsReducer;
