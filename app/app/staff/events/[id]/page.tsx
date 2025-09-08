// app/staff/events/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import ManualCheckinButton from "./manual-checkin-button";

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      registrations: {
        orderBy: { createdAt: "desc" },
        include: { user: true },
      },
    },
  });

  if (!event) return <p>Event not found.</p>;

  return (
    <div className="space-y-6">
      <div>
        <a href="/staff" className="underline text-sm">&larr; Back</a>
        <h1 className="text-2xl font-bold mt-2">{event.title}</h1>
        <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Checked In</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {event.registrations.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.user?.name || "-"}</td>
                <td className="p-2">{r.user?.email || "-"}</td>
                <td className="p-2">{r.checkedIn ? "✅" : "—"}</td>
                <td className="p-2">
                  {!r.checkedIn ? (
                    <ManualCheckinButton registrationId={r.id} />
                  ) : (
                    <span className="text-gray-500">Done</span>
                  )}
                </td>
              </tr>
            ))}
            {event.registrations.length === 0 && (
              <tr>
                <td className="p-2" colSpan={4}>No registrations yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
