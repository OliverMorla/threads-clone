"use client";

import Thread from "@/components/Thread";
import { useEffect, useState } from "react";

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
    <main className="h-full w-full flex justify-center items-center max-w-[1230px] mx-auto">
      <section className="p-2">
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
                  children={thread.children}
                  userImage={thread.user.image}
                />
              </>
            ))}
      </section>
    </main>
  );
};

export default Home;
