"use client";
import { convertDateTimeToTimeAgo, stripProtocol } from "@/utils";
import Link from "next/link";
import { useState } from "react";
// import { BsGlobe } from "react-icons/bs";
import { TbCopy } from "react-icons/tb";
import { UrlData } from ".";

export default function UrlCard({
  longUrl,
  shortUrl,
  customUrl,
  id,
  createdAt,
}: UrlData) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopied = async () => {
    await navigator.clipboard.writeText(customUrl || shortUrl);
    setIsCopied(!isCopied);
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="recentList">
      <div className="container containerRecent">
        {/* <div className="leftIcon">
          <BsGlobe />
        </div> */}

        <div className="rightContents gap-md-4">
          <div className="left">
            <div>
              <p className="mb-0 mainUrl">
                <span className="font-medium">Original Url: </span>
                <Link target="_blank" href={longUrl} className="mainUrl">
                  {stripProtocol(longUrl)}
                </Link>
              </p>
            </div>

            <div>
              <p className="mb-0 shortenedUrl">
                <span className="font-medium">Shortened Url: </span>
                {customUrl ? (
                  <Link
                    target="_blank"
                    href={customUrl}
                    className="shortenedUrl"
                  >
                    {stripProtocol(customUrl)}
                  </Link>
                ) : (
                  <Link
                    target="_blank"
                    href={shortUrl}
                    className="shortenedUrl"
                  >
                    {stripProtocol(shortUrl)}
                  </Link>
                )}
              </p>
            </div>

            <p className="time mb-md-0 mb-3">
              <span className="font-medium">Created: </span>
              {`${convertDateTimeToTimeAgo(createdAt)}`}
            </p>
          </div>

          <div className="right">
            <Link href={`/urls/${id}`}>
              <button className="stat-btn">Detailed stats</button>
            </Link>

            <div className="copy">
              <button className="copied-btn" onClick={handleCopied}>
                <TbCopy />
                Copy
              </button>
              {isCopied ? <span>Copied</span> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
