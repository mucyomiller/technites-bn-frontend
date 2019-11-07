/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export default axios.create({
  baseURL: 'https://technites-bn-backend-staging.herokuapp.com/api/v1',
});
