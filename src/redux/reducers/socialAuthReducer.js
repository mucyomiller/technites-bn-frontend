import {
  SOCIAL_LOGIN_FAILURE,
  SOCIAL_LOGIN_SUCCESS
} from "../actions/actionType";
import initialState from "./initialState";

 const socialAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user
      };
    default:
      return state;
  }
};

export default socialAuthReducer;
