import VerifyEmail from "@/components/auth/verify-email";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address using the provided token.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { email: string; token: string };
}) {
  const { email, token } = await searchParams;

  return <VerifyEmail email={email} token={token} />;
}
