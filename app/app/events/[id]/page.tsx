// app/events/[id]/page.tsx
// import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { Key } from "react";

interface EventPageProps {
  params: { id: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: { organizer: true, registrations: { include: { user: true } } },
  });

  if (!event) {
    return (
      <main className="p-6">
        <h1 className="text-xl text-red-600">Event not found</h1>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="mb-2 text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500">
        📍 {event.location} | 📅 {new Date(event.date).toLocaleString()}
      </p>
      <p className="mt-2 text-sm">
        Organized by: <strong>{event.organizer?.name}</strong>
      </p>

      {/* Registered participants */}
      <section className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Participants</h2>
        <ul className="list-disc pl-6">
          {event.registrations.map((reg: { id: Key | null | undefined; user: { name: any; }; }) => (
            <li key={reg.id}>{reg.user?.name ?? "Anonymous"}</li>
          ))}
        </ul>
      </section>

      {/* TODO: Hook these up with Socket.IO */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Live Features</h2>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          <li>🔔 Real-time schedule updates</li>
          <li>📱 QR check-in system</li>
          <li>🤝 Networking recommendations</li>
          <li>❓ Live Q&A and polls</li>
        </ul>
      </section>
    </main>
  );
}



// "use client";
// import { useEffect, useState } from "react";
// import useSocket from "@/hooks/useSocket";
// import InAppNotice, { notify, askNotificationPermission } from "@/components/InAppNotice";

// type Event = {
//   id: string;
//   title: string;
//   date: string;
//   location?: string;
//   description?: string;
//   sessions?: { id: string; title: string; start: string; end: string }[];
// };

// export default function EventDetail({ params }: { params: { id: string } }) {
//   const eventId = params.id;
//   const socket = useSocket(eventId);
//   const [event, setEvent] = useState<Event | null>(null);
//   const [toast, setToast] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       const res = await fetch(`/api/events/${eventId}`);
//       const data = await res.json();
//       setEvent(data);
//     })();
//   }, [eventId]);

//   useEffect(() => {
//     if (!socket) return;
//     const onEventUpdated = (payload: Event) => {
//       if (payload.id !== eventId) return;
//       setEvent(payload);
//       setToast("Schedule updated");
//       notify("Schedule updated", payload.title);
//     };
//     socket.on("event-updated", onEventUpdated);
//     return () => {
//       socket.off("event-updated", onEventUpdated);
//     };
//   }, [socket, eventId]);

//   if (!event) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">{event.title}</h1>
//         <div className="space-x-2">
//           <button
//             onClick={() => askNotificationPermission()}
//             className="rounded-lg border px-3 py-1"
//           >
//             Notify me on changes
//           </button>
//           <a className="rounded-lg border px-3 py-1" href={`/events/${eventId}/checkin`}>QR Check-in</a>
//         </div>
//       </div>
//       <div className="opacity-70">
//         {new Date(event.date).toLocaleString()} • {event.location ?? "TBA"}
//       </div>
//       <p>{event.description}</p>

//       <h2 className="text-lg font-medium mt-6">Sessions</h2>
//       <ul className="space-y-2">
//         {(event.sessions ?? []).map(s => (
//           <li key={s.id} className="rounded-lg border p-3">
//             <div className="font-medium">{s.title}</div>
//             <div className="text-sm opacity-70">
//               {new Date(s.start).toLocaleTimeString()} – {new Date(s.end).toLocaleTimeString()}
//             </div>
//           </li>
//         ))}
//       </ul>

//       {toast && <InAppNotice message={toast} />}
//     </div>
//   );
// }







// // // add near the bottom of /app/events/[id]/page.tsx
// // import LiveQA from "@/components/LiveQA";
// // import PollsFeedback from "@/components/PollsFeedback";

// // {/* ...inside the component render: */}
// // <div className="grid md:grid-cols-2 gap-6 mt-8">
// //   <LiveQA eventId={event.id} />
// //   <PollsFeedback eventId={event.id} />
// // </div>
