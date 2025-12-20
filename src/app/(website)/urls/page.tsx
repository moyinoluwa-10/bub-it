import Urls from "@/components/website/urls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Your URLs",
  description: "View and manage all your shortened URLs in one place.",
};

export default function Page() {
  return <Urls />;
}
