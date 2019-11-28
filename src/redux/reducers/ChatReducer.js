import * as actions from "../actions/actionType";

const initialState = {
  messages: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
}
