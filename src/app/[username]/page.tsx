"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Profile = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User>();

  const getData = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      console.log(data);
      if (data.ok) {
        setUser(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      alert(err instanceof Error && err.message);
    }
  };

  useEffect(() => {
    getData(`/api/auth/user/${username.split("%40")[1]}`);

    return () => {
      setUser(undefined);
    };
  }, []);

  return (
    <main className="h-full w-full flex justify-start flex-col items-center max-w-[500px] mx-auto">
      <section className="flex justify-between w-full items-center">
        <section>
          <h2 className="font-bold">John Doe</h2>
          <h3 className="text-sm flex gap-2 items-center">
            {user?.username}{" "}
            <p className="bg-[--septenary] text-xs rounded-md p-1">
              threads.net
            </p>
          </h3>
        </section>
        <section className="rounded-full bg-[--septenary]">
          <Image
            src="/assets/icons/user.svg"
            className="p-2"
            alt="User"
            width={85}
            height={85}
          />
        </section>
      </section>
      <section className="p-4 opacity-60">
        <p>{user?.bio ? user.bio : "No bio exist"}</p>
      </section>
      <section className="flex ">
        <section className="border-b-[1px] border-white px-10 py-3">
          <h1>Threads</h1>
        </section>
        <section className="border-b-[1px] border-white px-10 py-3 opacity-60">
          <h1>Replies</h1>
        </section>
        <section className="border-b-[1px] border-white px-10 py-3 opacity-60">
          <h1>Bookmarks</h1>
        </section>
      </section>
    </main>
  );
};

export default Profile;
