import * as actions from "../actions/actionType";

const initialState = {
  passwordReset: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.RESET_HOST:
      return {
        ...state,
        passwordReset: true,
      };
    default:
      return state;
  }
}
