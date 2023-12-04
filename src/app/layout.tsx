import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import AuthProvider from "@/providers/auth-provider";
import ReduxProvider from "@/providers/redux-provider";
import SocketProvider from "@/providers/socket-provider";
import NotificationProvider from "@/providers/notification-provider";

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
  keywords: ["threads", "threads-clone", "social"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          <AuthProvider>
            <NotificationProvider>
              <ReduxProvider>
                <Header />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <Footer />
              </ReduxProvider>
            </NotificationProvider>
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
