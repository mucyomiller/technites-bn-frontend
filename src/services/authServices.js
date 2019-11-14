import jwtDecode from "jwt-decode";
import http from "./httpServices";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

http.setJwt(getJwt());

const setJwtToLocalStorage = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

const authRegister = async (data) => {
  const res = await http.post("/auth/register", data);

  // setJwtToLocalStorage(res.data.token);
  return res.data;
};

const authLogin = async (data) => {
  const res = await http.post("/auth/login", data);
  setJwtToLocalStorage(res.data.data.token);
  return res.data;
};

const authLogout = async () => {
  const res = await http.post("/auth/logout");
  setJwtToLocalStorage(null);
  return res.data;
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};
export {
  getCurrentUser,
  setJwtToLocalStorage,
  getJwt,
  authRegister,
  authLogin,
  authLogout,
};
