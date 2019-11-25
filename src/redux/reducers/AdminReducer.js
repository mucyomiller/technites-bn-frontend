import * as actions from "../actions/actionType";

const initialState = {
  hostAdded: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_HOST:
      return {
        ...state,
        hostAdded: true,
      };
    default:
      return state;
  }
}
