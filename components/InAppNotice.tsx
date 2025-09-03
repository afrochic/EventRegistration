"use client";
import { useEffect, useState } from "react";

export function askNotificationPermission() {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") Notification.requestPermission();
}

export function notify(title: string, body?: string) {
  if (typeof window === "undefined") return;
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

export default function InAppNotice({ message }: { message: string }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(t);
  }, [message]);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-black/80 text-white px-4 py-2 shadow-lg z-50">
      {message}
    </div>
  );
}
