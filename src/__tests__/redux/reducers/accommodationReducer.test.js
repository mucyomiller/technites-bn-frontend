/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
/* eslint-disable no-undef */
import initialState from "../../../redux/store/initialState";
import reducers from "../../../redux/reducers/rootReducer";
import { getRate } from '../../../redux/actions/getRateAction';
import * as actions from "../../../redux/actions/actionType";
import accommodationsReducer from '../../../redux/reducers/accommodationsReducer';

describe("Reducers", () => {
  it("should test the get rate", () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_RATE,
      payload: 1,
    });
  });

  it("should pass this test", () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATION,
      accommodation: {},
    });
  });

  it("should pass this test", () => {
    const newState = accommodationsReducer(initialState, {
      type: actions.GET_ACCOMODATIONS,
      accommodations: [],
    });
  });

  // it("should pass this test", () => {
  //   const newState = accommodationsReducer(initialState, {
  //     type: actions.GET_RATE,
  //     payload: 1,
  //   });
  // });

  test("LIKE_UNLIKE_ACCOMMODATION", () => {
    const payload = { data: { status: 200, message: 'Liked Successfuly' }, status: "like_success" };
    const state = reducers({ accommodations: { accommodationsLikes: {} } }, {
      type: "LIKE_UNLIKE_ACCOMMODATION",
      payload
    });
    expect(state.accommodations).toEqual({ accommodationsLikes: payload });
  });
});