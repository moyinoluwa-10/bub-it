import Header from "@/components/layout/header";
import Image from "next/image";
import PageNotFound from "@/assets/svgs/page-not-found.svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="errorPage min-h-dvh px-4 pb-12">
      <Header showNav />

      <div>
        <div className="mx-auto my-12 cont">
          <Image
            src={PageNotFound}
            alt="Page Not Found"
            className="w-full mb-5"
          />
        </div>
        <h1 className="text-center font-bold text-3xl mb-4">PAGE NOT FOUND</h1>
        <p className="text-center mx-auto">
          We can’t seem to find the page you’re looking for. <br /> The link you
          followed may be broken or you may have entered the wrong link.
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/" className="footLink">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
