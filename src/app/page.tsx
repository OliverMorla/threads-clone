"use client";

import { Thread } from "@/components/Cards/Thread";
import { useEffect, useState } from "react";
import Image from "next/image";

const Home = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  const getThreads = async () => {
    try {
      const res = await fetch("/api/auth/threads");
      const { data, ok, status, message } = await res.json();

      if (ok) {
        setThreads(data);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getThreads();
  }, []);

  console.log(threads);

  return (
    <main className="h-auto w-full flex justify-center items-center max-w-[1230px] mx-auto flex-col">
      <section className="flex items-center gap-2 relative justify-between w-full max-w-[575px] m-2 p-2">
        <section className="rounded-full bg-[--septenary] h-fit w-fit">
          <Image
            src={"/assets/icons/user.svg"}
            alt="User"
            width={30}
            height={30}
          />
        </section>
        <input
          type="text"
          name="thread-input"
          placeholder="Start a thread..."
          className="w-full h-[50px] rounded-md p-2 bg-transparent text-white border-b-[1px] border-[--septenary]"
        />
        <button className="bg-zinc-500 text-white px-3 py-1 rounded-xl mt-2 hover:bg-zinc-600 transition-all absolute right-0">
          Post
        </button>
      </section>
      <section className="p-2 max-w-[575px] w-full">
        {threads.length === 0
          ? "No threads"
          : threads.map((thread) => (
              <>
                <Thread
                  key={thread._id}
                  text={thread.text}
                  threadId={thread._id}
                  username={thread.user.username}
                  createdAt={thread.createdAt}
                  likes={thread.likes}
                  replies={thread.replies}
                  userId={thread.user._id}
                  childrenThreads={null}
                  userImage={thread.user.image}
                />
              </>
            ))}
      </section>
    </main>
  );
};

export default Home;
