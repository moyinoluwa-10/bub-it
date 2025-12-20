import Link from "next/link";
// import HeroImage from "@/assets/gifs/hero.gif";
import HeroImage from "@/assets/images/hero.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="container homeContainer flex items-center justify-between md:gap-6 gap-12 mt-12">
      <div className="leftSection w-full">
        <h1 className="mb-4 font-bold text-[32px] md:text-[40px]">
          Shorten your long URLs
        </h1>
        <p className="mb-5">
          Bub-it is the hub of everything that has to do with your link
          management. We shorten your URLs, allow you create custom ones for
          your personal, business, event usage. Our swift QR code creation,
          management and usage tracking with advance analytics for all of these
          is second to none.
        </p>
        <Link href={"/bub"} className="btns">
          Try It Now
        </Link>
      </div>
      <div className="rightSection">
        <Image src={HeroImage} alt="shrink-it" />
      </div>
    </div>
  );
}
