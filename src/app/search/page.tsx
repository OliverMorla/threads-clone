"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { fetchUsers } from "@/lib/actions/search.actions";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers(10, { username: search });

      if (!users) {
        return;
      }

      setUsers(users);
    };
    getUsers();
  }, [search]);

  return (
    <main className="h-full w-full flex justify-start items-center flex-col max-w-[575px] mx-auto">
      <section className="relative h-auto w-full flex items-center">
        <Image
          src={"/assets/icons/search.svg"}
          alt="Search"
          width={20}
          height={20}
          className="absolute left-6"
        />
        <input
          type="text"
          name="search-input"
          placeholder="Search"
          className="bg-[--nonary] p-4 pl-12 rounded-xl w-full border-[--octonary] border-[1px] outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <section className="flex flex-col gap-2 mt-4 items-start w-full p-2">
        {users.map((user) => {
          // @ts-ignore
          if (user._id === session?.user?.id) return null;
          return (
            <motion.section
              key={user._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="flex bg-[--octonary] w-full min-h-[50px] rounded-lg items-center gap-4 p-2 relative"
            >
              <section>
                <Image
                  src={user.image || "/assets/icons/user.svg"}
                  alt="User"
                  width={45}
                  height={45}
                  className="rounded-full max-w-[45px] max-h-[45px] min-h-[45px] object-cover border-[--octonary] border-[1px]"
                />
              </section>
              <section className="flex items-center justify-between w-full">
                <h2>
                  <Link href={`/@${user.username}`}>{user.username}</Link>
                </h2>
                <button
                  className="bg-transparent appearance-none border-white border-[1px] p-2"
                  onClick={() => null}
                >
                  Follow
                </button>
              </section>
            </motion.section>
          );
        })}
      </section>
    </main>
  );
};

export default Search;
