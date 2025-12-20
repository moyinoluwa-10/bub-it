// lib/fetcher.ts
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export class HttpError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

function getMessage(obj: unknown): string | undefined {
  if (obj && typeof obj === "object" && "message" in obj) {
    const d = (obj as Record<string, unknown>)["message"];
    return typeof d === "string" ? d : undefined;
  }
  return undefined;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const session = await getSession();

  if (!session?.user) {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut({ redirect: false });
    toast.error("Session expired. Please log in again.");

    setTimeout(() => {
      redirect("/auth/login");
    }, 300);
    throw new HttpError(401, "Session expired", null);
  }

  const headers: HeadersInit = {
    ...(init?.headers || {}),
  };

  const res = await fetch(input, {
    ...init,
    headers,
  });

  let data: { success: boolean; message?: string; data?: unknown } = {
    success: false,
  };

  try {
    data = await res.clone().json();
  } catch {
    // not JSON, ignore
  }

  if (!res.ok) {
    throw new HttpError(res.status, getMessage(data) ?? res.statusText, data);
  }

  return data.data ?? (await res.json());
}
