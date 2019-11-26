import {
  RETRIEVE_USERS_SUCCESS,
  RETRIEVE_USERS_FAIL,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  CLEAR_STATE,
} from "../actions/actionType";

const initialState = {
  users: [],
  error: {},
  status: "",
};
const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_USERS_SUCCESS:
      return { ...state, users: action.payload, status: "retrieve_success" };
    case RETRIEVE_USERS_FAIL:
      return { ...state, error: action.payload, status: "retrieve_fail" };
    case ADD_ROLE_SUCCESS:
      return { ...state, status: "role_add_success" };
    case ADD_ROLE_FAIL:
      return { ...state, error: action.payload, status: "role_add_fail" };
    case CLEAR_STATE:
      return { ...state, error: {}, status: "" };
    default:
      return state;
  }
};
export default roleReducer;
