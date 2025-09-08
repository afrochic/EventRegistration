import { NextResponse } from "next/server";

// Mock DB for now
let registrations: any[] = [
  { id: "1", eventId: "e1", userName: "Alice", userEmail: "alice@example.com", checkedIn: false },
  { id: "2", eventId: "e1", userName: "Bob", userEmail: "bob@example.com", checkedIn: false },
];

export async function POST(req: Request) {
  const { eventId, regId } = await req.json();

  const regIndex = registrations.findIndex(
    (r) => r.id === regId && r.eventId === eventId
  );

  if (regIndex === -1) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  registrations[regIndex].checkedIn = true;

  return NextResponse.json({ success: true, registration: registrations[regIndex] });
}


// // app/api/checkin/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: Request) {
//   try {
//     const { token } = await req.json();

//     if (!token) {
//       return NextResponse.json({ error: "QR token is required" }, { status: 400 });
//     }

//     // find registration by token
//     const registration = await prisma.registration.findUnique({
//       where: { checkInToken: token },
//       include: { user: true, event: true },
//     });

//     if (!registration) {
//       return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
//     }

//     if (registration.checkedIn) {
//       return NextResponse.json({ error: "Already checked in" }, { status: 400 });
//     }

//     // update registration
//     const updated = await prisma.registration.update({
//       where: { id: registration.id },
//       data: { checkedIn: true },
//       include: { user: true, event: true },
//     });

//     return NextResponse.json({
//       message: `Check-in successful ✅ for ${updated.user.name || updated.user.email}`,
//       registration: updated,
//     });
//   } catch (err) {
//     console.error("Check-in error:", err);
//     return NextResponse.json(
//       { error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
