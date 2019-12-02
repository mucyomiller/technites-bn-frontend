/* eslint-disable no-debugger */
import * as types from '../actions/actionType';
import {
  getAllAccommodations,
  getAnAccommodation,
  setLikeUnLikeAccommodation
} from '../../services/accommodationServices';

export const getAccommodationsSuccess = accommodations => ({
  type: types.GET_ACCOMODATIONS,
  accommodations
});

export const getAnAccommodationSuccess = accommodation => ({
  type: types.GET_ACCOMODATION,
  accommodation
});

export const getAccommodations = () => async dispatch => {
  try {
    const accommodations = await getAllAccommodations();
    dispatch(getAccommodationsSuccess(accommodations.data));
  } catch (error) {
    console.log(error);
  }
};

export const getAccommodation = id => async dispatch => {
  try {
    const accommodation = await getAnAccommodation(id);
    dispatch(getAnAccommodationSuccess(accommodation.data));
  } catch (error) {
    console.log(error);
  }
};

export const LikeUnLikeAccommodation = id => async dispatch => {
  const accommodation = await setLikeUnLikeAccommodation(id);
  if (accommodation.response) {
    return dispatch({
      type: types.LIKE_UNLIKE_ACCOMMODATION,
      payload: { data: accommodation.response, status: "like_success" },
    });
  }
  return dispatch({
    type: types.LIKE_UNLIKE_ACCOMMODATION,
    payload: { data: accommodation.error, status: "like_error" },
  });
};