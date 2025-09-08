// app/api/checkin/token/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find or create registration
    let registration = await prisma.registration.findUnique({
      where: {
        userId_eventId: { userId: user.id, eventId },
      },
    });

    if (!registration) {
      registration = await prisma.registration.create({
        data: {
          userId: user.id,
          eventId,
        },
      });
    }

    // Generate a token if none exists
    if (!registration.checkInToken) {
      const token = crypto.randomBytes(16).toString("hex");
      registration = await prisma.registration.update({
        where: { id: registration.id },
        data: { checkInToken: token },
      });
    }

    return NextResponse.json({ token: registration.checkInToken });
  } catch (err) {
    console.error("Error generating check-in token:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
