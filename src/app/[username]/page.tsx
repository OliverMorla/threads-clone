"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Profile = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const [user, setUser] = useState<User>();
  const { data: session } = useSession();

  const getData = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const { data, ok, status, message } = await res.json();
      if (ok) {
        setUser(data);
      } else {
        throw new Error(message);
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
          <h2 className="font-bold">{user?.name}</h2>
          <h3 className="text-sm flex gap-2 items-center">
            {user?.username}{" "}
            <p className="bg-[--septenary] text-xs rounded-md p-1">
              threads.net
            </p>
          </h3>
        </section>
        <section className="flex flex-col items-center">
          <section className="rounded-full bg-[--septenary] h-fit w-fit">
            <Image
              src="/assets/icons/user.svg"
              className="p-2"
              alt="User"
              width={85}
              height={85}
            />
          </section>
          {
            // @ts-ignore
            session?.user.username === username.split("%40")[1] && (
              <Link href={"/auth/edit-profile"}>
                <button className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors">
                  Edit Profile
                </button>
              </Link>
            )
          }
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
