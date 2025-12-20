// api/backend/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  ctx: { params: { path: string[] } }
) {
  try {
    const params = await ctx.params;
    const path = params.path.join("/");
    const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${req.nextUrl.search}`;

    const upstream = await fetch(upstreamUrl, {
      headers: {
        cookie: req.headers.get("cookie") ?? "",
        accept: "application/json",
      },
      cache: "no-store",
      credentials: "include",
    });

    const body = await upstream.arrayBuffer();

    const res = new NextResponse(body, { status: upstream.status });
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.headers.set("content-type", contentType);
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  ctx: { params: { path: string[] } }
) {
  try {
    const params = await ctx.params;
    const path = params.path.join("/");
    const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${req.nextUrl.search}`;

    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") ?? "",
        accept: "application/json",
      },
      body: JSON.stringify(await req.json()),
      cache: "no-store",
    });

    const data = await upstream.arrayBuffer();
    const res = new NextResponse(data, { status: upstream.status });
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.headers.set("content-type", contentType);
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: { path: string[] } }
) {
  try {
    const params = await ctx.params;
    const path = params.path.join("/");
    const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${req.nextUrl.search}`;

    const upstream = await fetch(upstreamUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") ?? "",
        accept: "application/json",
      },
      body: JSON.stringify(await req.json()),
      cache: "no-store",
    });

    console.log("upstream", upstream);

    const data = await upstream.arrayBuffer();
    const res = new NextResponse(data, { status: upstream.status });
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.headers.set("content-type", contentType);
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: { path: string[] } }
) {
  try {
    const params = await ctx.params;
    const path = params.path.join("/");
    const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${req.nextUrl.search}`;

    const upstream = await fetch(upstreamUrl, {
      method: "DELETE",
      headers: {
        cookie: req.headers.get("cookie") ?? "",
        accept: "application/json",
      },
      cache: "no-store",
    });

    const body = await upstream.arrayBuffer();
    const res = new NextResponse(body, { status: upstream.status });
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.headers.set("content-type", contentType);
    return res;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
