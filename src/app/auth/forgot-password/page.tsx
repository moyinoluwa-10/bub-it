import ForgotPassword from "@/components/auth/forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password for your account.",
};

export default function Page() {
  return <ForgotPassword />;
}
