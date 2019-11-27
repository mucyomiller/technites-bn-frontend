/* eslint-disable import/prefer-default-export */
import http from "./httpServices";

export const getAllAccommodations = async () => {
  const res = await http.get("/accommodations");
  return res.data;
};

export const getAnAccommodation = async (id) => {
  const res = await http.get(`/accommodations/${id}`);
  return res.data;
};
