import { PASSWORD_RESET, PASSWORD_CHANGE } from "../actions/actionType";
import initialState from "./initialState";

const passWordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_RESET:
      return { ...state, passWordResetLink: action.payload.data, displayVerify: true};
    case PASSWORD_CHANGE:
      return { ...state, changePassMessage: action.payload.data };
    default:
      return state;
  }
};
export default passWordResetReducer;
