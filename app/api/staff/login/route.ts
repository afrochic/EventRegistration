import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== "STAFF") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password || "");
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create response and set cookie
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("staff", "1", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    console.error("Staff login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// // app/api/staff/login/route.ts
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { password } = await req.json();
//   if (!password || password !== process.env.STAFF_PASS) {
//     return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//   }

//   const res = NextResponse.json({ ok: true });
//   res.cookies.set("staff", "1", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 8, // 8 hours
//   });
//   return res;
// }

