import { combineReducers } from "redux";
import testReducer from "./testReducer";
import RequestReducer from "./RequestsReducer";
import ErrorReducer from "./ErrorReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  test: testReducer,
  Requests: RequestReducer,
  errors: ErrorReducer,
  register: registerReducer,
  loginState: loginReducer,
  profile: profileReducer,
});

export default rootReducer;
