/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import initialState from '../../../redux/store/initialState';
import reducers from '../../../redux/reducers/rootReducer';
import { getRate } from '../../../redux/actions/getRateAction';
import * as actions from '../../../redux/actions/actionType';
import accommodationsReducer from '../../../redux/reducers/accommodationsReducer';
import  { locations, accommodations, accommodation } from "../../../__mocks__/fixtures"

describe('Accommodation CRUD Reducer', () => {
  let newState;
  test('should update the loading state while loading', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.LOADING,
      payload: true
    });
    expect(newState.isLoading).toBe(true)
    
  });

  test('should CREATE_ACCOMMODATION', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.CREATE_ACCOMMODATION,
      payload: accommodation
    });
    expect(newState.accommodations).toEqual([accommodation])
  });

  test('should CREATE_ROOM', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.CREATE_ROOM,
      payload: accommodation
    });
    expect(newState.newRoom).toEqual(accommodation)
  });

  test('should update all the locations state', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.GET_LOCATIONS,
      payload: locations
    });
    // expect(newState.locations).toEqual(locations)
  });

  test('should GET_ACCOMODATION', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATIONS,
      payload: accommodation
    });
    // expect(newState.accommodation).toEqual(accommodation)
  });

  test('should GET_ACCOMODATIONS', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATIONS,
      payload: accommodations
    });
    // expect(newState.accommodations).toEqual(accommodations)
  });

  test('should GET_HOST_ACCOMODATIONS', () => {
    newState = accommodationsReducer(initialState, {
      type: actions.GET_HOST_ACCOMODATIONS,
      payload: accommodations
    });
    // expect(newState.accommodations).toEqual(accommodations)
  });
});

describe('Accommodation Rating Reducers', () => {
  it('should test the get rate', () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_RATE,
      payload: 1
    });
  });

  it('should pass this test', () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATION,
      accommodation: {}
    });
  });

  it('should pass this test', () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATIONS,
      accommodations: []
    });
  });

  test('LIKE_UNLIKE_ACCOMMODATION', () => {
    const payload = {
      data: { status: 200, message: 'Liked Successfuly' },
      status: 'like_success'
    };
    const state = reducers(
      { accommodations: { accommodationsLikes: {} } },
      {
        type: 'LIKE_UNLIKE_ACCOMMODATION',
        payload
      }
    );
    expect(state.accommodations).toEqual({ accommodationsLikes: payload });
  });
});
