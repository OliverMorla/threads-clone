"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

import ActivtyCard from "@/components/Cards/ActivtyCards";

import { ActivityItems } from "@/constants";

const Activity = () => {
  // get session data from next-auth
  const { data: session } = useSession();

  // if user is not logged in, redirect to login page
  // if (!session?.user) {
  //   redirect("/auth/login");
  // }

  return (
    <main className="h-full w-full flex items-center flex-col gap-4">
      <section className="relative flex gap-2">
        {ActivityItems.map((item, index) => (
          <input
            key={index}
            type="radio"
            name={item.category}
            data-text={item.name}
            className="relative appearance-none w-[100px] h-[35px] border-[--octonary] border-[1px] bg-transparent rounded-lg cursor-pointer checked:bg-white checked:text-black before:content-[attr(data-text)] before:absolute before:flex before:items-center before:justify-center before:w-full before:h-full before:transition-all before:duration-300 before:ease-in-out transition-all"
          />
        ))}
      </section>
      <section className="flex flex-col mt-4 max-w-[575px] w-full gap-4">
        <ActivtyCard
          username={"oliverm11_"}
          createdAt={"2d"}
          activty="started following you"
        />
        <ActivtyCard
          username={"oliverm11_"}
          createdAt={"2d"}
          activty="started following you"
        />
      </section>
    </main>
  );
};

export default Activity;
