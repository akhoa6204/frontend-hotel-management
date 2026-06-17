import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

export const socket = new Client({
  webSocketFactory: () => new SockJS("http://localhost:3001/api/ws"),
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
});
