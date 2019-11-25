import passWordResetReducer from "../../../redux/reducers/PasswordResetReducer";
import { PASSWORD_CHANGE, PASSWORD_RESET } from "../../../redux/actions/actionType";
import initialState from "../../../redux/reducers/initialState";

const data = {
  password: "qwe123@A",
  confirm_password: "qwe123@A",
};

const data2 = {
  email: "someone@something.com",
};

const state = { ...initialState, changePassMessage: "message" };

test("should mark send email to reset password", () => {
  const action = {
    type: PASSWORD_RESET,
    payload: data2,
  };
  const response = passWordResetReducer(state, action);
  expect(response.resetPasswordLink).toBeFalsy();
});

test("should get password message on redux", () => {
  const action = {
    type: PASSWORD_CHANGE,
    payload: data,
  };
  const response = passWordResetReducer(state, action);
  expect(response.changePassMessage).toBeFalsy();
});

test("should return default", () => {
  const response = passWordResetReducer(state, "blue");
  expect(response).toBe(state);
});
test("initial state stye", () => {
  expect(initialState).toBeTruthy();
});

test("should return default", () => {
  const response = passWordResetReducer("state", "blue");
  expect(response).toBe("state");
});

test("should return default", () => {
  const action = {
    type: PASSWORD_CHANGE,
    payload: data,
  };
  const response = passWordResetReducer(state, action);
  expect(response.passWordResetLink).toBe("");
});
