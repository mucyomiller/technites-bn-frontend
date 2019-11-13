/* eslint-disable indent */
/* eslint-disable comma-dangle */
import { combineReducers } from "redux";
import testReducer from "./testReducer";
import registerReducer from "./registerReducer";

const rootReducer = combineReducers({
    test: testReducer,
    register: registerReducer
});

export default rootReducer;
