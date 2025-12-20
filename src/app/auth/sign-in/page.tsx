import SignIn from "@/components/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access exclusive features.",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  const { callbackUrl } = await searchParams;

  return <SignIn callbackUrl={callbackUrl} />;
}
