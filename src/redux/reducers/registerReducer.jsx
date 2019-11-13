/* eslint-disable comma-dangle */
import { REGISTER } from "../actions/actionType";

const initialState = {
  users: {},
  errors: {}
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, users: action.payload.data };
    default:
      return state;
  }
};
export default registerReducer;
