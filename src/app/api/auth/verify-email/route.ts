// api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;
if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in environment");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const upstream = await fetch(
      `${NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email`,
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
    return NextResponse.json(data, { status: upstream.status });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
