"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Registration = {
  id: string;
  userName: string;
  userEmail: string;
  checkedIn: boolean;
};

type Event = {
  id: string;
  name: string;
  registrations: Registration[];
};

export default function StaffDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const res = await fetch("/api/staff/registrations");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const handleCheckIn = async (eventId: string, regId: string) => {
    const res = await fetch(`/api/staff/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, regId }),
    });

    if (res.ok) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                registrations: event.registrations.map((r) =>
                  r.id === regId ? { ...r, checkedIn: true } : r
                ),
              }
            : event
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>

      {loading && <p>Loading events...</p>}
      {!loading && events.length === 0 && <p>No events found.</p>}

      {events.map((event) => (
        <div key={event.id} className="mb-8 border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-center">Status</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {event.registrations.map((reg) => (
                <tr key={reg.id}>
                  <td className="border p-2">{reg.userName}</td>
                  <td className="border p-2">{reg.userEmail}</td>
                  <td className="border p-2 text-center">
                    {reg.checkedIn ? (
                      <span className="text-green-600 font-semibold">
                        ✅ Checked In
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        ❌ Not Checked In
                      </span>
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    {!reg.checkedIn && (
                      <Button
                        onClick={() => handleCheckIn(event.id, reg.id)}
                        className="bg-blue-600 text-white"
                      >
                        Check In
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
