"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Activity = () => {
  const { data: session } = useSession();

  // if user is not logged in, redirect to login page
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <main className="h-full w-full flex justify-center items-center">
      <h1>Activity</h1>
    </main>
  );
};

export default Activity;
