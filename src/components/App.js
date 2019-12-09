import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import configureStore from "../redux/store/configureStore";
import { setToken } from "../redux/actions/loginAction";
import { getCurrentUser } from "../services/authServices";
import "../styles/App.scss";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Router";

const store = configureStore();
const token = localStorage.getItem("token");

if (token && token !== "null") {
  const { exp } = getCurrentUser();
  const currentTime = Date.now() / 1000;
  if (exp < currentTime) {
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  store.dispatch(setToken(localStorage.token));
}

const App = () => (
  // Whole app wrapped in BrowserRouter to provide the browser’s HTML5 History APIs
  <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
      <div className="main-wrapper">
        <div className="App">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
