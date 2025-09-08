// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // TODO: persist to DB or integrate SendGrid / Mailgun here.
  console.log("Newsletter signup:", email);

  return NextResponse.json({ ok: true });
}
