// // lib/auth.ts
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google"; // example provider

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: { strategy: "jwt" },
// };

// lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // 👉 Add whichever providers you want
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // better for stateless APIs
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub; // attach user id to session
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // optional custom sign-in page
  },
};

