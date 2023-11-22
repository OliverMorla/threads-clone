"use client";

import { Fragment } from "react";
import { Thread } from "@/components/Cards/Thread";
import { useSelector } from "react-redux";
import Image from "next/image";

import useFetch from "@/hooks/useFetch";
import { LoadingWithoutBg } from "@/components/Loading";

const Home = () => {
  const {
    data,
    loading,
    error,
  }: {
    data: Thread[] | null;
    loading: boolean;
    error: string | null;
  } = useFetch("/api/threads", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const threads: Thread[] = useSelector(
    (state: any) => state.threadReducer.threads
  );

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
        <button className="bg-zinc-500 text-white px-3 py-1 rounded-xl mt-2 hover:bg-zinc-600 transition-all absolute right-0 m-2">
          Post
        </button>
      </section>
      <section className="p-2 max-w-[575px] w-full">
        {loading ? (
          <LoadingWithoutBg />
        ) : (
          threads?.map((thread) => {
            if (thread._id !== "initialThread") {
              return (
                <Fragment key={thread._id}>
                  <Thread
                    key={thread._id}
                    text={thread.text}
                    threadId={thread._id}
                    username={thread.user.username}
                    createdAt={thread.createdAt}
                    likes={thread.likes.length}
                    replies={thread.replies.length}
                    image={thread.image}
                    userId={thread.user._id}
                    childrenThreads={null}
                    userImage={thread.user.image}
                  />
                </Fragment>
              );
            }
          })
        )}
      </section>
    </main>
  );
};

export default Home;
