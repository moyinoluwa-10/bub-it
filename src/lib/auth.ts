// lib/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const cookie = req?.headers?.cookie ?? "";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
          {
            method: "GET",
            headers: { accept: "application/json", cookie },
            cache: "no-store",
            credentials: "include",
          }
        );
        if (!res.ok) return null;
        const data = (await res.json()).data;
        return {
          id: data.user.userId,
          email: data.user.email,
          role: data.user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email!,
          role: user.role!,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/auth/sign-in",
  },
};
