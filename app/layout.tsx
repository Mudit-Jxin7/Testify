"use client";

import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./globals.css";
import { useState } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${poppins.className} bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-50`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  );
}
