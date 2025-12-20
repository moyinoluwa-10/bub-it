import ResendVerification from "@/components/auth/resend-verification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resend Verification Email",
  description: "Resend the verification email to your account.",
};

export default function Page() {
  return <ResendVerification />;
}
