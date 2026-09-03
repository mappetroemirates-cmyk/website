import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Candidate Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const candidate = await prisma.candidate.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!candidate) {
          return null;
        }

        const passwordValid = await bcrypt.compare(
          password,
          candidate.password
        );

        if (!passwordValid) {
          return null;
        }

        return {
          id: candidate.id,
          email: candidate.email,
          name: candidate.fullName,
          role: "candidate" as const,
        };
      },
    }),
  ],
});
