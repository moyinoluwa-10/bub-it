"use client";
import Header from "../../layout/header";
import { BiHome } from "react-icons/bi";
import OhNo from "@/assets/svgs/oh-no.svg";
import Link from "next/link";
import UrlCard from "./card";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/fetcher";

type Analytics = {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  acceptLanguage: String;
  city?: string;
  country?: string;
  region?: string;
};

export interface UrlData {
  id: string;
  longUrl: string;
  shortUrl: string;
  customUrl?: string;
  active: boolean;
  createdAt: string;
  noOfClicks: number;
  userId?: string;
  qrcode?: string;
  analytics: Analytics[];
}

const fetchUrls = async () => {
  const res = await apiFetch("/api/backend/api/urls/me");
  return res.urls;
};

export default function Urls() {
  const {
    data: urls,
    isLoading,
    isError,
  } = useQuery<UrlData[]>({
    queryKey: ["urls"],
    queryFn: fetchUrls,
  });

  if (isLoading) {
    return (
      <div className="recentPage w-full px-4 min-h-dvh">
        <Header showNav />
        <div className="container">
          <p>Loading urls...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="recentPage w-full px-4 min-h-dvh">
        <Header showNav />
        <div className="container">
          <p>Error loading urls. Please try again later.</p>
          <p></p>
        </div>
      </div>
    );
  }

  return (
    <div className="recentPage w-full min-h-dvh">
      <Header showNav />

      <div className="px-4">
        <h2 className="mt-5 text-center text-3xl font-bold">
          Your Recent Bub-Urls
        </h2>

        <div className="py-12">
          {!urls || urls.length === 0 ? (
            <div className="noRecent">
              <div className="imageContainer mx-auto mb-4">
                <img src={OhNo} alt="" className="w-full" />
              </div>
              <p className="text-center mb-4">
                You have not created any Bub-Urls yet. <br /> Let's create a new
                one!
              </p>
              <Link href={"/bub"} className="icon-box mx-auto block">
                <BiHome className="home" /> Bub a Url
              </Link>
            </div>
          ) : null}
          {urls &&
            urls.map((data) => {
              return <UrlCard key={data.id} {...data} />;
            })}
        </div>
      </div>
    </div>
  );
}
