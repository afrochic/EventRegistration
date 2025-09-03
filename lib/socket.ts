// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:4000", {
      withCredentials: true, // so cookies are sent with the handshake if same-origin
      autoConnect: false
    });
  }
  return socket;
}
