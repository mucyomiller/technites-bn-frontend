import axios from "axios";

const heroku = "https://technites-bn-backend-staging.herokuapp.com/api/v1";
const local = "http://localhost:3000/api/v1/";

const dbCall = axios.create({
  baseURL: heroku,
});

const setJwt = (jwt) => {
  dbCall.defaults.headers.common.Authorization = `Bearer ${jwt}`;
};

export default {
  get: dbCall.get,
  post: dbCall.post,
  put: dbCall.put,
  patch: dbCall.patch,
  delete: dbCall.delete,
  setJwt,
  dbCall,
};
