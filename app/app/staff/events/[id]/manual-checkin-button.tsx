// app/staff/events/[id]/manual-checkin-button.tsx
"use client";
import { useState } from "react";

export default function ManualCheckinButton({ registrationId }: { registrationId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function mark() {
    setLoading(true);
    setErr("");
    const res = await fetch("/api/staff/registrations/checkin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId }),
    });
    if (res.ok) setDone(true);
    else {
      const j = await res.json();
      setErr(j.error || "Failed");
    }
    setLoading(false);
  }

  if (done) return <span className="text-green-600">Checked-in</span>;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={mark}
        disabled={loading}
        className="px-3 py-1 border rounded hover:bg-gray-50"
      >
        {loading ? "…" : "Mark Checked-in"}
      </button>
      {err && <span className="text-red-600 text-xs">{err}</span>}
    </div>
  );
}
