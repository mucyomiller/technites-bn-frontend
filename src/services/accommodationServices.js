/* eslint-disable import/prefer-default-export */
import http from './httpServices';

export const getLocations = async () => {
  const res = await http.get('/locations');
  return res.data;
};

export const getAllAccommodations = async () => {
  const res = await http.get('/accommodations');
  return res.data;
};

export const getHostAccommodations = async () => {
  const res = await http.get('/accommodations/hosts');
  return res.data;
};

export const getAnAccommodation = async id => {
  const res = await http.get(`/accommodations/${id}`);
  return res.data;
};

export const setLikeUnLikeAccommodation = async id => {
  try {
    const res = await http.post(`/accommodations/${id}/like`);
    return { response: res.data, error: null };
  } catch (error) {
    const err = error.response ? error.response.data : { error: error.message };
    return { response: null, error: err };
  }
};

export const postAccommodation = async data => {
  try {
    const res = await http.post('/accommodations/hosts', data);
    return res.data;
  } catch (error) {
    const err = error.response ? error.response.data.error : error.message;
    return { res: null, error: err };
  }
};

export const postRoom = async data => {
  try {
    const res = await http.post('/accommodations/rooms', data);
    return res;
  } catch (error) {
    const err = error.response ? error.response.data.error : error.message;
    return { res: null, error: err };
  }
};
