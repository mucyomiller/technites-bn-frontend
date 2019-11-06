import initialState from "./initialState";
import { LOGIN, SET_TOKEN } from "../actions/actionType";

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.response.data.user,
        isAuthenticated: true
      };
    case SET_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
};

export default loginReducer;
