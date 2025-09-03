// "use client";
// import { useEffect, useState } from "react";
// import useSocket from "@/hooks/useSocket";
// import InAppNotice, { notify, askNotificationPermission } from "@/components/InAppNotice";

// type Event = {
//   id: string;
//   title: string;
//   date: string;      // ISO
//   location?: string;
//   description?: string;
// };

// export default function EventsPage() {
//   const socket = useSocket(); // global channel for created/updated
//   const [events, setEvents] = useState<Event[]>([]);
//   const [toast, setToast] = useState<string | null>(null);

//   // initial load
//   useEffect(() => {
//     (async () => {
//       // Replace with your API route
//       const res = await fetch("/api/events");
//       const data = await res.json();
//       setEvents(data);
//     })();
//   }, []);

//   // realtime listeners
//   useEffect(() => {
//     if (!socket) return;
//     const onCreated = (ev: Event) => {
//       setEvents(prev => [ev, ...prev]);
//       setToast(`New event: ${ev.title}`);
//       notify("New Event", ev.title);
//     };
//     const onUpdated = (ev: Event) => {
//       setEvents(prev => prev.map(p => p.id === ev.id ? ev : p));
//       setToast(`Event updated: ${ev.title}`);
//       notify("Event Updated", ev.title);
//     };

//     socket.on("event-created", onCreated);
//     socket.on("event-updated", onUpdated);

//     return () => {
//       socket.off("event-created", onCreated);
//       socket.off("event-updated", onUpdated);
//     };
//   }, [socket]);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold">Events</h1>
//         <button
//           onClick={() => askNotificationPermission()}
//           className="rounded-lg border px-3 py-1"
//         >
//           Enable Notifications
//         </button>
//       </div>

//       <ul className="grid gap-3">
//         {events.map(ev => (
//           <li key={ev.id} className="rounded-xl border p-4">
//             <a href={`/events/${ev.id}`} className="font-medium hover:underline">{ev.title}</a>
//             <div className="text-sm opacity-70">
//               {new Date(ev.date).toLocaleString()} • {ev.location ?? "TBA"}
//             </div>
//             <p className="text-sm mt-1">{ev.description}</p>
//           </li>
//         ))}
//       </ul>

//       {toast && <InAppNotice message={toast} />}
//     </div>
//   );
// }



// // app/events/page.tsx
// import Link from "next/link";
// import { Prisma } from "@prisma/client";
// import { prisma } from "@/lib/prisma";
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


// export default async function EventsPage() {
//   // Fetch all events from DB
//   const events = await prisma.event.findMany({
//     orderBy: { date: "asc" },
//     include: { organizer: true },
//   });

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
//       <ul className="space-y-4">
//         {events.map((event: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | Date; organizer: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => (
//           <li key={event.id} className="p-4 rounded-lg shadow-md border">
//             <Link href={`/events/${event.id}`}>
//               <div className="cursor-pointer">
//                 <h2 className="text-xl font-semibold">{event.title}</h2>
//                 <p className="text-gray-600">{event.description}</p>
//                 <p className="text-sm text-gray-500">
//                   📍 {event.location} | 📅{" "}
//                   {new Date(event.date).toLocaleString()}
//                 </p>
//                 <p className="text-sm mt-1">
//                   Organized by: <strong>{event.organizer?.name}</strong>
//                 </p>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }


// app/app/events/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { organizer: true },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <ul className="space-y-4">
        {events.map((event: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; date: string | number | Date; organizer: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => (
          <li key={event.id} className="p-4 rounded-lg shadow-md border">
            <Link href={`/app/events/${event.id}`}>
              <div className="cursor-pointer">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
                  📍 {event.location} | 📅{" "}
                  {new Date(event.date).toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  Organized by: <strong>{event.organizer?.name}</strong>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
