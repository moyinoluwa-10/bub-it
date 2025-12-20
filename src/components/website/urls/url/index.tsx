"use client";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import Header from "@/components/layout/header";
import Link from "next/link";
import Dock from "@/assets/svgs/window-dock.svg";
import Illustration from "@/assets/images/url-detail-illustration.png";
import { IoChevronBackOutline, IoPersonOutline } from "react-icons/io5";
import { HiQrcode } from "react-icons/hi";
import { BsDownload, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Image from "next/image";
import { convertDateTimeToTimeAgo, stripProtocol } from "@/utils";
import { apiFetch } from "@/lib/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UrlData } from "..";
import { toast } from "sonner";

const fetchUrl = async (id: string) => {
  const res = await apiFetch(`/api/backend/api/urls/${id}`);
  return res.url;
};

export default function Url({ id }: { id: string }) {
  const router = useRouter();
  const qc = useQueryClient();

  const {
    data: url,
    isLoading,
    isError,
  } = useQuery<UrlData>({
    queryKey: ["urls", id],
    queryFn: () => fetchUrl(id),
  });

  const handleDelete = useMutation({
    mutationFn: async () =>
      apiFetch(`/api/backend/api/urls/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["urls"] });
      toast.success("URL deleted successfully");
      router.push("/urls");
    },
    onError: () => {
      toast.error("Failed to delete URL");
    },
  });

  const handleEdit = useMutation({
    mutationFn: async (action: "enable" | "disable" | "qrcode") => {
      return apiFetch(`/api/backend/api/urls/${id}/${action}`, {
        method: action === "qrcode" ? "POST" : "PATCH",
        body: JSON.stringify({}),
      });
    },
    onSuccess: (abc) => {
      console.log(abc);

      qc.invalidateQueries({ queryKey: ["urls", id] });
      toast.success("URL updated successfully");
    },
    onError: () => {
      toast.error("Failed to update URL");
    },
  });

  if (isLoading) {
    return (
      <div className="statPage w-full px-4 min-h-dvh">
        <Header showNav />
        <div className="container">
          <p>Loading URL details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="statPage w-full px-4 min-h-dvh">
        <Header showNav />
        <div className="container">
          <p>Error loading URL details. Please try again later.</p>
        </div>
      </div>
    );
  }

  const downloadImg = () => {
    if (url?.qrcode) saveAs(url.qrcode, "qrcode.png");
  };

  return (
    <div className="statPage min-h-dvh w-full pb-12">
      <Header showNav />
      <div className="px-4">
        <div className="cont container">
          <Link
            href="/urls"
            className="back inline-flex items-center gap-2 mb-6 mt-12"
          >
            <IoChevronBackOutline /> Back to my URLs
          </Link>
        </div>

        <div className="container">
          <h3 className="text-center mb-5 text-3xl font-bold">
            Detailed Stats
          </h3>

          <div className="container flex items-center justify-center gap-12 statCont">
            <div>
              <div className="mb-4">
                {url?.qrcode && (
                  <>
                    <Image
                      src={url.qrcode}
                      alt="qrcode image"
                      width={180}
                      height={180}
                    />
                    <button
                      className="download flex items-center gap-4 px-4 py-1 mt-2"
                      onClick={downloadImg}
                    >
                      Download <BsDownload className="icon block mt-2" />
                    </button>
                  </>
                )}
                {!url?.qrcode && (
                  <>
                    <button
                      className="download flex items-center gap-4 px-4 py-1 my-2"
                      onClick={() => handleEdit.mutate("qrcode")}
                    >
                      Generate Qrcode <HiQrcode className="icon" />
                    </button>
                  </>
                )}
              </div>
              <div className="mb-4">
                <div className="urls flex items-center mb-2">
                  <Image src={Dock} alt="" className="me-4 dock-image" />{" "}
                  <p className="mb-1">
                    <Link target="_blank" href={url?.longUrl!}>
                      {stripProtocol(url?.longUrl!)}
                    </Link>
                  </p>
                </div>
                <div className="urls flex items-center mb-2">
                  <Image src={Dock} alt="dock" className="me-4 dock-image" />{" "}
                  <p className="mb-0">
                    <Link
                      target="_blank"
                      href={url?.customUrl || url?.shortUrl!}
                    >
                      {stripProtocol(url?.customUrl || url?.shortUrl!)}
                    </Link>{" "}
                  </p>
                </div>
              </div>
              <div className="flex gap-10 items-center mb-5">
                <div className="flex gap-2 items-center">
                  {!url?.active && (
                    <BsFillEyeSlashFill
                      className="icon inline-block"
                      onClick={() => handleEdit.mutate("enable")}
                    />
                  )}
                  {url?.active && (
                    <BsFillEyeFill
                      className="icon inline-block"
                      onClick={() => handleEdit.mutate("disable")}
                    />
                  )}
                  <div className={`active ${url?.active}`}>
                    {url?.active ? "active" : "inactive"}
                  </div>
                </div>
                <div>
                  <button
                    className="download px-4 py-1"
                    onClick={() => handleDelete.mutate()}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mb-2 clicks">
                The total number of clicks that your link has received so far:
              </p>
              <p className="text-center md:inline-block block mb-3">
                <span className="noOfClicks">
                  {url?.noOfClicks && url?.noOfClicks}
                </span>{" "}
                <br /> Clicks
              </p>
              <div className="linksContainer w-full">
                {url?.noOfClicks && url?.noOfClicks > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>IP</th>
                        <th>Timestamp</th>
                        {/* <th>Referrer</th> */}
                        {/* <th>User Agent</th> */}
                        {/* <th>Accept Language</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {url.analytics &&
                        url.analytics.map((analytic, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <IoPersonOutline />
                              </td>
                              <td>{analytic?.ipAddress}</td>
                              <td>
                                {convertDateTimeToTimeAgo(analytic?.timestamp)}
                              </td>
                              {/* <td>{analytic.referrer}</td> */}
                              {/* <td>{analytic.userAgent}</td> */}
                              {/* <td>{analytic.acceptLanguage}</td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center noClicks">
                    There are no clicks yet
                  </div>
                )}
              </div>
            </div>

            <div className="imageContainer">
              <Image
                src={Illustration}
                alt="illustration"
                className="w-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
