import SignUp from "@/components/auth/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account to get started.",
};

export default function Page() {
  return <SignUp />;
}
