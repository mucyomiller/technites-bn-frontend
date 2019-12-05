/* eslint-disable comma-dangle */
import { REGISTER } from "../actions/actionType";
import initialState from "./initialState";

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, users: action.payload.data, registerVerify:true };
    default:
      return state;
  }
};
export default registerReducer;
