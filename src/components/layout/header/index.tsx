"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/images/logo.png";
import { signOut, useSession } from "next-auth/react";

export default function Header({ showNav }: { showNav?: boolean }) {
  const router = useRouter();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleToggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const { status } = useSession();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <header className="header w-full px-4!">
      <div className="container flex justify-between items-center">
        <div className="logoContainer">
          <Link href="/">
            <Image src={Logo} alt="logo" className="w-full" loading="eager" />
          </Link>
        </div>

        {showNav && (
          <>
            <div
              className={showMobileNav ? "hamburger active" : "hamburger"}
              onClick={handleToggleMobileNav}
            >
              <span className="line block"></span>
              <span className="line block"></span>
              <span className="line block"></span>
            </div>

            <nav
              className={
                showMobileNav ? "navigation-menu expanded" : "navigation-menu"
              }
            >
              <Link href={"/bub"}>
                <button className="login">Bub</button>
              </Link>
              {status === "authenticated" ? (
                <>
                  <Link href={"/urls"}>
                    <button className="login">Urls</button>
                  </Link>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href={"/auth/sign-in"}>
                    <button className="login">Log in</button>
                  </Link>
                  <Link href={"/auth/sign-up"}>
                    <button className="signUp">Sign up</button>
                  </Link>
                </>
              )}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
