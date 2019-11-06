import {
  RETRIEVE_PROFILE,
  RETRIEVE_FAIL,
  UPDATE_PROFILE,
  UPDATE_FAIL,
} from "../actions/actionType";

const initialState = {
  user: {},
  error: {},
  status: "",
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_PROFILE:
      return { ...state, user: action.payload, status: "retrieve_success" };
    case RETRIEVE_FAIL:
      return { ...state, error: action.payload, status: "retrieve_fail" };
    case UPDATE_PROFILE:
      return { ...state, user: action.payload, status: "update_success" };
    case UPDATE_FAIL:
      return { ...state, error: action.payload, status: "update_fail" };
    default:
      return state;
  }
};
export default profileReducer;
