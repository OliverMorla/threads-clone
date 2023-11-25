"use client";

import { Fragment } from "react";
import { useSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";
import { Thread } from "@/components/Cards/Thread";
import { LoadingWithoutBg } from "@/components/Loading";

const Bookmarks = () => {
  const { data: session } = useSession();

  const {
    data: threads,
    loading,
    error,
  }: {
    data: any;
    loading: boolean;
    error: string | null;
  } = useFetch("/api/auth/bookmarks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <main className="h-full w-full flex justify-center items-center flex-col">
      <section className="p-2 max-w-[575px] w-full">
        {loading ? (
          <LoadingWithoutBg />
        ) : threads?.length > 0 ? (
          threads?.map((thread: Thread) => {
            if (thread._id !== "initialThread") {
              return (
                <Fragment key={thread._id}>
                  <Thread
                    key={thread._id}
                    text={thread.text}
                    threadId={thread._id}
                    username={thread.user.username}
                    createdAt={thread.createdAt}
                    likes={thread.likes}
                    replies={thread.replies}
                    threadImage={thread.image}
                    userId={thread.user._id}
                    userImage={thread.user.image}
                  />
                </Fragment>
              );
            }
          })
        ) : (
          <h1 className="text-center p-2">No bookmarks</h1>
        )}
      </section>
    </main>
  );
};

export default Bookmarks;
