// import Link from "next/link";
// import { prisma } from "@/lib/prisma";
// import Countdown from "@/components/Countdown";
// import EventCard from "@/components/EventCard";
// import NewsletterForm from "@/components/NewsletterForm";
// import Feature from "@/components/Feature";
// import type { EventWithOrganizer } from "@/lib/types";  // ✅ use shared type

// export default async function HomePage() {
//   const events: EventWithOrganizer[] = await prisma.event.findMany({
//     orderBy: { date: "asc" },
//     take: 3,
//     include: { organizer: true }, // ensures organizer is always present (or null)
//   });

//   const nextEvent = events.length ? events[0] : null;

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* ... rest unchanged ... */}
//       <aside className="w-full md:w-96 space-y-4">
//         <div className="bg-white rounded-xl p-4 shadow">
//           <h3 className="font-semibold">Upcoming events</h3>
//           <div className="mt-3 space-y-3">
//             {events.length === 0 && <div className="text-sm text-gray-500">No upcoming events</div>}
//             {events.map((ev) => (
//               <EventCard key={ev.id} event={ev} />
//             ))}

//           </div>
//           <div className="mt-4 text-right">
//             <Link href="/app/events" className="text-sm underline">See all events</Link>
//           </div>
//         </div>
//         {/* ... rest unchanged ... */}
//       </aside>
//     </main>
//   );
// }



// import Link from 'next/link';
// import { FaCalendarAlt, FaQrcode, FaUsers, FaChartBar } from 'react-icons/fa';

// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
//       <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
//         {/* Left Column: Heading and Description */}
//         <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
//             The Future of Events is Here
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-300 max-w-prose">
//             Experience seamless event engagement with real-time updates, digital check-ins, and powerful networking tools.
//           </p>
//           <div className="flex justify-center md:justify-start mt-6">
//             <Link href="/events" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
//               Explore Events
//             </Link>
//           </div>
//         </div>

//         {/* Right Column: Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <FaCalendarAlt className="text-blue-500 text-3xl mb-4" />
//             <h3 className="font-semibold text-xl mb-2">Real-time Schedules</h3>
//             <p className="text-gray-400">
//               Get instant access to event timings and notifications for any changes[cite: 24, 25].
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <FaQrcode className="text-blue-500 text-3xl mb-4" />
//             <h3 className="font-semibold text-xl mb-2">QR-based Check-ins</h3>
//             <p className="text-gray-400">
//               Enjoy an efficient registration process with quick and easy participant verification[cite: 27, 28].
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <FaUsers className="text-blue-500 text-3xl mb-4" />
//             <h3 className="font-semibold text-xl mb-2">Networking Features</h3>
//             <p className="text-gray-400">
//               Connect with other participants based on interests to facilitate meaningful interactions[cite: 30, 31].
//             </p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
//             <FaChartBar className="text-blue-500 text-3xl mb-4" />
//             <h3 className="font-semibold text-xl mb-2">Live Q&A & Polls</h3>
//             <p className="text-gray-400">
//               Enhance participant engagement and gather valuable insights with live features[cite: 33, 34].
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// app/page.tsx
import Link from "next/link";
import { FaCalendarAlt, FaQrcode, FaUsers, FaChartBar } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Column: Heading and Description */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            The Future of Events is Here
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-prose">
            Experience seamless event engagement with real-time updates, digital check-ins, and powerful networking tools.
          </p>
          <div className="flex justify-center md:justify-start mt-6">
            <Link
              href="/app/events"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>

        {/* Right Column: Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaCalendarAlt className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Real-time Schedules</h3>
            <p className="text-gray-400">
              Get instant access to event timings and notifications for any changes.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaQrcode className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">QR-based Check-ins</h3>
            <p className="text-gray-400">
              Enjoy an efficient registration process with quick and easy participant verification.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaUsers className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Networking Features</h3>
            <p className="text-gray-400">
              Connect with other participants based on interests to facilitate meaningful interactions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <FaChartBar className="text-blue-500 text-3xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Live Q&A & Polls</h3>
            <p className="text-gray-400">
              Enhance participant engagement and gather valuable insights with live features.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
