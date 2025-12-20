// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` etc.
   */
  interface Session extends DefaultSession {
    user: {
      /** from your backend */
      id: string;
      email: string;
      role: string;
    };
    /** our custom accessToken prop */
  }

  /**
   * The `user` object returned by your CredentialsProvider.authorize()
   * and available in `callbacks.jwt({ user })`.
   */
  interface User extends DefaultUser {
    /** we put the backend token here */
    role: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * The JWT payload that we build up and persist in the session cookie.
   */
  interface JWT extends NextAuthJWT {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}
