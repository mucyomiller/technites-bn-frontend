/* eslint-disable no-debugger */
import * as types from '../actions/actionType';
import {
  getAllAccommodations,
  getAnAccommodation
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
