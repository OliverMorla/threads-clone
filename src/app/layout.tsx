import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import AuthProvider from "@/providers/auth-providers";
import ThreadProvider from "@/providers/thread-provider";

import Loading from "./loading";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "A clone of the threads website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThreadProvider>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
          </ThreadProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
