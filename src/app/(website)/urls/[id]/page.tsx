import Url from "@/components/website/urls/url";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Details",
  description: "View and manage the details of your shortened URL.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <Url id={id} />;
}
