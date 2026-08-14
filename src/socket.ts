import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const socket = new Client({
  webSocketFactory: () =>
    new SockJS(import.meta.env.VITE_WS_URL || "http://localhost:3001/api/ws"),
  reconnectDelay: 5000,
  debug: (str) => console.log(str),
});
