import {
  RETRIEVE_COMMENT,
  RETRIEVE_COMMENT_FAIL,
  SUBMIT_COMMENT,
  SUBMIT_COMMENT_FAIL,
} from "../actions/actionType";

const initialState = {
  comments: [],
  currentComment: {},
  error: {},
  status: "",
};
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_COMMENT:
      return { ...state, comments: action.payload, status: "comment_retrieve_success" };
    case RETRIEVE_COMMENT_FAIL:
      return { ...state, error: action.payload, status: "comment_retrieve_fail" };
    case SUBMIT_COMMENT:
      return { ...state, currentComment: action.payload, status: "comment_submit_success" };
    case SUBMIT_COMMENT_FAIL:
      return { ...state, error: action.payload, status: "comment_submit_fail" };
    default:
      return state;
  }
};
export default commentReducer;
