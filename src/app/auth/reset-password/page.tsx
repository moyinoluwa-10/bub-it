import ResetPassword from "@/components/auth/reset-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your account password using the provided token.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string; token: string };
}) {
  const { email, token } = await searchParams;

  return <ResetPassword email={email} token={token} />;
}
