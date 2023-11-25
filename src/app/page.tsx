"use client";

import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { Thread } from "@/components/Cards/Thread";
import { LoadingWithoutBg } from "@/components/Loading";
import { addThread } from "@/redux/slices/thread-slice";

const Home = () => {
  // get threads from api then store in redux store
  const {
    data,
    loading,
    error,
  }: {
    data: any;
    loading: boolean;
    error: string | null;
  } = useFetch("/api/threads", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // get threads from redux store
  const threads: Thread[] = useSelector(
    (state: any) => state.threadReducer.threads
  );

  const { data: session } = useSession();
  const dispach = useDispatch();

  console.log(threads);

  return (
    <main className="h-auto w-full flex justify-center items-center max-w-[1230px] mx-auto flex-col">
      <section className="flex items-center gap-2 relative justify-between w-full max-w-[575px] m-2 p-2">
        <section className="rounded-full bg-[--septenary] h-fit w-fit">
          <Image
            src={
              // @ts-ignore
              session?.user.image
                ? session.user.image
                : "/assets/icons/user.svg"
            }
            alt="User"
            width={45}
            height={45}
            className="rounded-full max-w-[45px] max-h-[45px] object-cover border-[--octonary] border-[1px]"
          />
        </section>
        <input
          type="text"
          name="thread-input"
          placeholder="Start a thread..."
          className="w-full h-[50px] rounded-md p-2 bg-transparent text-white border-b-[1px] border-[--septenary]"
        />
        <button
          className="bg-zinc-900 text-white x-3 p-2 rounded-xl mt-2 hover:bg-zinc-600 transition-all absolute right-0 m-2"
          onClick={() => alert("Please use the create icon on the header!")}
        >
          Post
        </button>
      </section>
      <section className="p-2 max-w-[575px] w-full">
        {loading ? (
          <LoadingWithoutBg />
        ) : threads.length > 0 ? (
          threads?.map((thread) => {
            if (thread._id !== "initialThread") {
              return (
                <Fragment key={thread._id}>
                  <Thread
                    text={thread.text}
                    threadId={thread._id}
                    likes={thread.likes}
                    replies={thread.replies}
                    threadImage={thread.image}
                    userId={thread.user._id}
                    username={thread.user.username}
                    userImage={thread.user.image}
                    createdAt={thread.createdAt}
                  />
                </Fragment>
              );
            }
          })
        ) : (
          <h1>No threads yet</h1>
        )}
      </section>
    </main>
  );
};

export default Home;
