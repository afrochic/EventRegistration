// hooks/useSocket.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

let socketSingleton: Socket | null = null;

function getSocket(): Socket {
  if (!socketSingleton) {
    socketSingleton = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socketSingleton;
}

export function useSocket<T = any>(
  roomId?: string,
  eventName?: string,
  onMessage?: (data: T) => void
) {
  const socketRef = useRef<Socket>(getSocket());
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s = socketRef.current;
    if (!s.connected) s.connect();

    // join a room
    if (roomId) s.emit("join-event", roomId);

    // event listener
    if (eventName && onMessage) {
      s.on(eventName, onMessage);
    }

    s.on("connect", () => {
      setConnected(true);
      console.log("🔌 Connected to socket server");
    });

    s.on("disconnect", () => {
      setConnected(false);
      console.log("❌ Disconnected from socket server");
    });

    return () => {
      if (roomId) s.emit("leave-event", roomId);
      if (eventName && onMessage) s.off(eventName, onMessage);
    };
  }, [roomId, eventName, onMessage]);

  return { socket: socketRef.current, connected };
}




// "use client";
// import { io, Socket } from "socket.io-client";
// import { useEffect, useRef } from "react";

// let socketSingleton: Socket | null = null;

// export function getSocket(): Socket {
//   if (!socketSingleton) {
//     socketSingleton = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
//       withCredentials: true,
//       autoConnect: false,
//       transports: ["websocket"],
//     });
//   }
//   return socketSingleton;
// }

// export default function useSocket(roomId?: string) {
//   const socketRef = useRef<Socket>(getSocket());

//   useEffect(() => {
//     const s = socketRef.current;
//     if (!s.connected) s.connect();

//     if (roomId) s.emit("join-event", roomId);
//     return () => {
//       if (roomId) s.emit("leave-event", roomId);
//     };
//   }, [roomId]);

//   return socketRef.current;
// }






// "use client";

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// export function useSocket() {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
//       transports: ["websocket"],
//     });

//     setSocket(socketInstance);

//     // Cleanup on unmount
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return socket;
// }

