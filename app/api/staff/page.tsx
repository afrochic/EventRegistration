// app/staff/page.tsx
import { prisma } from "@/lib/prisma";

export default async function StaffHomePage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      registrations: {
        select: { id: true, checkedIn: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Events</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map((e) => {
          const total = e.registrations.length;
          const checked = e.registrations.filter(r => r.checkedIn).length;
          return (
            <a
              key={e.id}
              href={`/staff/events/${e.id}`}
              className="border rounded p-4 hover:bg-gray-50 block"
            >
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm text-gray-600">{new Date(e.date).toLocaleString()}</div>
              <div className="mt-2 text-sm">
                Registered: <b>{total}</b> &middot; Checked-in: <b>{checked}</b>
              </div>
            </a>
          );
        })}
      </div>
      {events.length === 0 && <p>No events yet.</p>}
    </div>
  );
}
