"use client";

import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";

const RedirectProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <>
      {!session?.user &&
      (pathname.startsWith("/chat") ||
        pathname.startsWith("/bookmarks") ||
        pathname.startsWith("/activity") ||
        pathname.startsWith("/auth/edit-profile"))
        ? redirect("/auth/login")
        : children}
    </>
  );
};

export default RedirectProvider;
