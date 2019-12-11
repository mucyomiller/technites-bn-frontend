/* eslint-disable consistent-return */
import http from "./httpServices";

export const getMostTravelled = async () => {
  try {
    const res = await http.get("/requests/mostTravelledDestinations");
    return res.data || '';
  } catch (error) {
    return null;
  }
};

export const getTripStats = async (id, years = 0, months = 0, days = 1) => {
  try {
    const res = await http.get(`/users/${id}/trips?years=${years}&&months=${months}&&days=${days}`);
    return res.data;
  } catch (e) {
    return null;
  }
};
