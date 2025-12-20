import Bub from "@/components/website/bub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Short URL",
  description: "Create a Short URL with Bub It.",
};

export default function Page() {
  return <Bub />;
}
