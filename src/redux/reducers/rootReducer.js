import { combineReducers } from 'redux';
import testReducer from './testReducer';
import UserRequestReducer from './UserRequestsReducer';
import ErrorReducer from './ErrorReducer';
import registerReducer from "./registerReducer";

const rootReducer = combineReducers({
  test: testReducer,
  userRequests: UserRequestReducer,
  errors: ErrorReducer,
  register: registerReducer,
});

export default rootReducer;
