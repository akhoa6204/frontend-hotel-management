import { useEffect } from "react";
import { socket } from "../socket";
import type { IMessage, StompSubscription } from "@stomp/stompjs";

type UseSocketOptions<T = any> = {
  topic?: string;
  handler: (data: T) => void;
};

export default function useSocket<T = any>({
  topic,
  handler,
}: UseSocketOptions<T>) {
  useEffect(() => {
    if (!topic) return;

    let subscription: StompSubscription | undefined;

    const subscribe = () => {
      if (!socket.connected) return;

      subscription = socket.subscribe(topic, (message: IMessage) => {
        try {
          const data = JSON.parse(message.body) as T;
          handler(data);
        } catch (error) {
          console.error("Socket parse error:", error);
          console.error("Message body:", message.body);
        }
      });
    };

    if (!socket.active) {
      socket.onConnect = () => {
        subscribe();
      };

      socket.activate();
    } else if (socket.connected) {
      subscribe();
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [topic]);
}
