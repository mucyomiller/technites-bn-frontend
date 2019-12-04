/* eslint-disable no-fallthrough */
import * as types from '../actions/actionType';
import initialState from '../store/initialState';

const accommodationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, isLoading: action.payload}
  
    case types.GET_LOCATIONS:
      return { ...state, locations: action.payload.locations}

    case types.GET_ACCOMODATIONS:
      return { ...state, accommodations: action.payload };

      case types.GET_HOST_ACCOMODATIONS:
      return { ...state, hostAccommodations: action.payload };

    case types.GET_ACCOMODATION:
      return { ...state, accommodation: action.payload };

    case types.GET_RATE:
      return { ...state, averageRatings: action.payload };

    case types.LIKE_UNLIKE_ACCOMMODATION:
      return { ...state, accommodationsLikes: action.payload };

    case types.CREATE_ACCOMMODATION:
      return {
        ...state,
        accommodations: [...state.accommodations, action.payload],
        isLoading: false,
      };

      case types.CREATE_ROOM:
      return {
        ...state,
        newRoom: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default accommodationsReducer;
