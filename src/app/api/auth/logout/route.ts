// api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;
if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in environment");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const upstream = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await upstream.json();
    const setCookies =
      upstream.headers.getSetCookie?.() ?? upstream.headers.get("set-cookie");
    const res = NextResponse.json(data, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
    if (setCookies) {
      if (Array.isArray(setCookies)) {
        setCookies.forEach((c) => res.headers.append("Set-Cookie", c));
      } else {
        res.headers.set("Set-Cookie", setCookies);
      }
    }
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
