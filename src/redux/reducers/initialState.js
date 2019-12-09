import { getCurrentUser } from "../../services/authServices";

const initialState = {
  isAuthenticated: false,
  token: getCurrentUser(),
  user: {},
  users: [],
  errors: {},
  notifications: [],
  notMessage: "",
  notPaneDisplay: false,
  notificationCount: 0,
  passWordResetLink: "",
  changePassMessage: "",
  requests: [],
  mostVisitedMsg: "",
  trips: [],
  totalTrips: 0,
  displayVerify: false,
  registerVerify: false
};

export default initialState;
