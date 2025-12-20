import Link from "next/link";
import FeatureCard from "./card";
import { FiEdit, FiLink } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { IoAnalytics } from "react-icons/io5";
import { LuHistory } from "react-icons/lu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Features() {
  const session = await getServerSession(authOptions);

  return (
    <div className="features">
      <div className="container">
        <div className="row">
          <div className="left mt-12">
            <div className="content">
              <h3 className="text-3xl">Features Bub-it offers</h3>
              <p className="mt-4 mb-12">
                The following are some of the features Bub-it offers to its
                users. They are available to all registered users of this
                website.
              </p>
              <Link href={session ? "/urls" : "/auth/sign-up"} className="btn">
                {session ? "View URLs" : "Sign Up Now"}
              </Link>
            </div>
          </div>

          <div className="right">
            <FeatureCard
              Icon={<FiLink className="icon" />}
              Header={"URL Shortening"}
              Content={
                "Bub-it allows you to shorten long URLs of your business and events. Shorten your URL at scale and share on social media or through other channels."
              }
            />
            <FeatureCard
              Icon={<FiEdit className="icon" />}
              Header={"Custom URLs"}
              Content={
                "With Bub-it, you can create custom URLs, with the length you want to reflect your brand or content. A solution for socials and businesses."
              }
            />
            <FeatureCard
              Icon={<BsQrCode className="icon" />}
              Header={"QR Codes"}
              Content={
                "Bub-it allows users to also generate QR codes for the shortened URLs. Users can download the QR code image and use it in their promotional materials or/and on their website. Bring your audience and customers to your doorstep with this scan and go solution"
              }
            />
            <FeatureCard
              Icon={<IoAnalytics className="icon" />}
              Header={"Analytics"}
              Content={
                "Bub-it provides basic analytics that allow users to track their shortened URL's performance. Users can see how many clicks their shortened URL has received and where the clicks are coming from."
              }
            />
            <FeatureCard
              Icon={<LuHistory className="icon" />}
              Header={"Link History"}
              Content={
                "Receive data on the usage of either your shortened URL, custom URLs or generated QR codes. Embedded to monitor progress."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
