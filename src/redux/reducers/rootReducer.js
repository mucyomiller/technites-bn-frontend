import { combineReducers } from "redux";
import testReducer from "./testReducer";
import RequestReducer from "./RequestsReducer";
import ErrorReducer from "./ErrorReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import passWordResetReducer from "./PasswordResetReducer";


const rootReducer = combineReducers({
  test: testReducer,
  Requests: RequestReducer,
  errors: ErrorReducer,
  register: registerReducer,
  loginState: loginReducer,
  profile: profileReducer,
  notifications: notificationReducer,
  passwordReset: passWordResetReducer,
});

export default rootReducer;
