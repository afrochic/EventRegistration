"use client";
import Networking from "@/components/Networking";
// Replace with session.user.id when NextAuth wired
export default function NetworkingPage() {
  return <div className="p-6"><Networking currentUserId="me" /></div>;
}
