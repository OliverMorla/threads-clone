"use client";

import { SessionProvider } from "next-auth/react";
import RedirectProvider from "./redirect-provider";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <RedirectProvider>{children}</RedirectProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
