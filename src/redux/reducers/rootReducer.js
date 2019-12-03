import { combineReducers } from "redux";
import testReducer from "./testReducer";
import RequestReducer from "./RequestsReducer";
import ErrorReducer from "./ErrorReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import profileReducer from "./profileReducer";
import notificationReducer from "./notificationReducer";
import passWordResetReducer from "./PasswordResetReducer";
import AdminReducer from "./AdminReducer";
import HostReducer from "./HostReducer";
import roleReducer from "./roleReducer";
import accommodationsReducer from "./accommodationsReducer";
import ChatReducer from "./ChatReducer";
import feedbackReducer from "./feedbackReducer";

import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  test: testReducer,
  Requests: RequestReducer,
  searchRequests: RequestReducer,
  errors: ErrorReducer,
  register: registerReducer,
  loginState: loginReducer,
  profile: profileReducer,
  notifications: notificationReducer,
  passwordReset: passWordResetReducer,
  accomodations: RequestReducer,
  rooms: RequestReducer,
  admin: AdminReducer,
  host: HostReducer,
  role: roleReducer,
  comment: commentReducer,
  accommodations: accommodationsReducer,
  messages: ChatReducer,
  feedback: feedbackReducer,
});

export default rootReducer;
