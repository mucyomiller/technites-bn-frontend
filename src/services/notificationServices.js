/* eslint-disable consistent-return */
import http from "./httpServices";

export const getNotificationsReq = async () => {
  try {
    const res = await http.get("/users/notifications");
    return res.data.data.filter((not) => not.seen === "false").reverse();
  } catch (error) {
    return [];
  }
};
export const markAllReadReq = async () => {
  const res = await http.patch("/users/notifications/seen");
  return res.data.message;
};

export const markOneReadReq = async (id) => {
  const res = await http.get(`/users/notification/${id}/seen`);
  return res.data;
};
