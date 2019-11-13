import { combineReducers } from "redux";
import testReducer from "./testReducer";
import UserRequestReducer from "./UserRequestsReducer";
import ErrorReducer from "./ErrorReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  test: testReducer,
  userRequests: UserRequestReducer,
  errors: ErrorReducer,
  register: registerReducer,
  loginState: loginReducer
});

export default rootReducer;
