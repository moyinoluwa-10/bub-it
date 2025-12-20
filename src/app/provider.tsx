"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" richColors />
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
}
