// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import QRCode from "qrcode";
import { sendMail } from "@/lib/mailer"; // 👈 use Mailtrap setup

export async function POST(req: Request) {
  try {
    const { name, email, eventId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate token
    const token = crypto.randomBytes(16).toString("hex");

    // 1. Ensure user exists (create if missing)
    const user = await prisma.user.upsert({
      where: { email },
      update: { name: name || undefined },
      create: { email, name },
    });

    // 2. Resolve event
    let event = null;

    if (eventId) {
      event = await prisma.event.findUnique({ where: { id: eventId } });
      if (!event) {
        return NextResponse.json(
          { error: `Event '${eventId}' not found` },
          { status: 404 }
        );
      }
    } else {
      event = await prisma.event.upsert({
        where: { id: "DefaultEvent" },
        update: {},
        create: {
          id: "DefaultEvent",
          title: "Default Welcome Event",
          description: "Automatically created fallback event.",
          location: "Nairobi, Kenya",
          date: new Date(),
          organizerId: user.id,
        },
      });
    }

    // 3. Create or update registration
    const registration = await prisma.registration.upsert({
      where: {
        userId_eventId: { userId: user.id, eventId: event.id },
      },
      update: { checkInToken: token },
      create: {
        userId: user.id,
        eventId: event.id,
        checkInToken: token,
      },
      include: { user: true, event: true },
    });

    // 4. Generate QR code
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify({ token }));

    // 5. Send confirmation email (via Mailtrap)
    await sendMail({
      to: email,
      subject: `Your Ticket for ${event.title}`,
      html: `
        <p>Hi ${name || "there"},</p>
        <p>Thanks for registering for <b>${event.title}</b>! Please show this QR code at the entrance:</p>
        <img src="${qrDataUrl}" alt="Your Ticket QR" />
      `,
    });

    return NextResponse.json({
      message: `Registration successful for event '${event.title}'`,
      registration,
      user,
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
