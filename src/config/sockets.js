/* eslint-disable import/no-mutable-exports */
import socketIOClient from "socket.io-client";

const baseUrl = "https://technites-bn-backend-staging.herokuapp.com/";

export let socket = null;

export function connect() {
  socket = socketIOClient.connect(baseUrl);
}
