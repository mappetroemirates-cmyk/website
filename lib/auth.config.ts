import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  // Distinct cookie names so the candidate session never collides with the
  // admin app's — browsers share cookies across localhost ports, and both
  // apps otherwise use NextAuth's default cookie names.
  cookies: {
    sessionToken: { name: "candidate.session-token" },
    callbackUrl: { name: "candidate.callback-url" },
    csrfToken: { name: "candidate.csrf-token" },
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};
