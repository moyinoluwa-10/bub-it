"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { VercelAnalytics } from "@/lib/analytics";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          const status = (error as any)?.status;
          if (status === 401) return false;
          return failureCount < 3;
        },
      },
      mutations: {
        retry: (failureCount, error) => {
          const status = (error as any)?.status;
          if (status === 401) return false;
          return failureCount < 3;
        },
      },
    },
  });

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" richColors />
        <VercelAnalytics />
      </QueryClientProvider>
    </SessionProvider>
  );
}
