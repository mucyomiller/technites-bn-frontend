/* eslint-disable import/no-mutable-exports */
import io from "socket.io-client";

const baseUrl = "https://technites-bn-backend-staging.herokuapp.com/";
export const local = "http://localhost:3000"

export let socket = null;

export function connect() {
  socket = io(baseUrl);
}
