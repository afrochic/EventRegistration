import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      include: {
        user: true,
        event: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(registrations);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}
