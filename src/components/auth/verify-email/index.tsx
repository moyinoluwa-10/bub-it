"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail({
  email,
  token,
}: {
  email?: string;
  token?: string;
}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!email || !token) {
    return (
      <p className="text-center">
        Invalid verification link. Please check your email for the correct link.
      </p>
    );
  }

  const verifyToken = async () => {
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        token,
      }),
    });

    if (!res.ok) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!email || !token) {
      setError(true);
      setLoading(false);
      return;
    }
    verifyToken();
  }, [email, token]);

  if (loading) {
    return (
      <p className="text-center">Verifying your account, please wait...</p>
    );
  }

  if (error) {
    return (
      <>
        <div className="text-center">
          <p className="mb-3">
            Verification failed. The verification link may be invalid or
            expired.
          </p>
          <Link href="/auth/resend-verification" className="formCont">
            <button className="button">Resend Verification Email</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="text-center">
      <p className="mb-3">Your email has been verified successfully!</p>
      <Link href="/auth/sign-in" className="formCont">
        <button className="button">Login</button>
      </Link>
    </div>
  );
}
