import {
  RETRIEVE_FEEDBACK_SUCCESS,
  RETRIEVE_FEEDBACK_FAIL,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAIL,
} from "../actions/actionType";

const initialState = {
  feedbacks: [],
  currentFeedback: {},
  error: {},
  status: "",
};
const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_FEEDBACK_SUCCESS:
      return { ...state, feedbacks: action.payload, status: "feedback_retrieve_success" };
    case RETRIEVE_FEEDBACK_FAIL:
      return { ...state, error: action.payload, status: "feedback_retrieve_fail" };
    case SUBMIT_FEEDBACK_SUCCESS:
      return { ...state, currentFeedback: action.payload, status: "feedback_submit_success" };
    case SUBMIT_FEEDBACK_FAIL:
      return { ...state, error: action.payload, status: "feedback_submit_fail" };
    default:
      return state;
  }
};
export default feedbackReducer;
