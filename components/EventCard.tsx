// components/EventCard.tsx
"use client";

import Link from "next/link";
import type { EventWithOrganizer } from "@/lib/types";

export default function EventCard({ event }: { event: EventWithOrganizer }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
      <Link href={`/events/${event.id}`}>
        <div className="cursor-pointer">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-gray-600">{event.description}</p>
          <p className="text-sm text-gray-500">
            📍 {event.location} | 📅 {new Date(event.date).toLocaleString()}
          </p>
          {event.organizer && (
            <p className="text-xs mt-1">
              Organized by <strong>{event.organizer.name}</strong>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
