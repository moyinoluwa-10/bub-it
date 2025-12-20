import Bub from "@/components/website/bub";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create ",
  description: "Create a short URL with Bub It.",
};

export default function Page() {
  return <Bub />;
}
