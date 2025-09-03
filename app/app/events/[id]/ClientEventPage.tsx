"use client";

import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function ClientEventPage({ initialEvent }: { initialEvent: any }) {
  const [event, setEvent] = useState(initialEvent);

  useSocket(
    event.id,                         // roomId
    `event:update:${event.id}`,       // eventName
    (data) => {
      console.log("📡 Update received:", data);
      setEvent((prev: any) => ({ ...prev, ...data }));
    }
  );

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
    </main>
  );
}
