import { getCurrentUser } from "../../services/authServices";

const initialState = {
  isAuthenticated: false,
  token: getCurrentUser(),
  user: {},
  errors: {},
};

export default initialState;
