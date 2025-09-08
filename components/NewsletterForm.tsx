// components/NewsletterForm.tsx
"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="you@example.com"
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <button type="submit" className="rounded-lg bg-indigo-600 text-white px-4 py-2" disabled={status === "loading"}>
          {status === "loading" ? "Saving..." : "Subscribe"}
        </button>
      </div>
      {status === "ok" && <div className="text-sm text-green-600">Subscribed — thanks!</div>}
      {status === "error" && <div className="text-sm text-red-600">Failed to subscribe.</div>}
    </form>
  );
}
