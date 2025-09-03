"use client";
import { useEffect, useMemo, useState } from "react";

const ALL_INTERESTS = ["AI", "Web", "Design", "DevOps", "Blockchain", "Startups", "Marketing"];

type User = { id: string; name: string; email?: string; interests: string[] };

export default function Networking({ currentUserId }: { currentUserId: string }) {
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [people, setPeople] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const me = await fetch(`/api/users/${currentUserId}`).then(r => r.json());
      setMyInterests(me.interests ?? []);
      const others = await fetch(`/api/users?exclude=${currentUserId}`).then(r => r.json());
      setPeople(others);
    })();
  }, [currentUserId]);

  function toggle(interest: string) {
    setMyInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  }

  async function saveInterests() {
    await fetch(`/api/users/${currentUserId}/interests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interests: myInterests })
    });
  }

  const ranked = useMemo(() => {
    return people
      .map(p => ({
        ...p,
        score: p.interests.filter(i => myInterests.includes(i)).length
      }))
      .sort((a, b) => b.score - a.score);
  }, [people, myInterests]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Interests</h2>
      <div className="flex flex-wrap gap-2">
        {ALL_INTERESTS.map(i => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`px-3 py-1 rounded-full border ${myInterests.includes(i) ? "bg-black text-white" : ""}`}
          >
            {i}
          </button>
        ))}
      </div>
      <button onClick={saveInterests} className="rounded-lg border px-3 py-1">Save</button>

      <h2 className="text-lg font-semibold mt-6">Suggested Connections</h2>
      <ul className="space-y-2">
        {ranked.map(p => (
          <li key={p.id} className="rounded-lg border p-3">
            <div className="font-medium">{p.name}</div>
            <div className="text-sm opacity-70">Overlap: {p.score}</div>
            <div className="text-sm">{p.interests.join(", ")}</div>
            <a className="text-sm underline" href={`mailto:${p.email ?? ""}`}>Say hi</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
