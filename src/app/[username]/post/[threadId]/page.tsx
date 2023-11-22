"use client";

import { ThreadWithChildren } from "@/components/Cards/Thread";
import useFetch from "@/hooks/useFetch";
import { LoadingWithoutBg } from "@/components/Loading";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";

const Post = ({ params: { threadId } }: { params: { threadId: string } }) => {
  const {
    data: thread,
    loading,
    error,
  }: {
    data: any
    loading: boolean;
    error: string | null;
  } = useFetch(`/api/auth/threads/${threadId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(thread);
  return (
    <main className="h-auto w-full flex justify-center items-center max-w-[1230px] mx-auto flex-col">
      <section className="p-2 max-w-[575px] w-full">
        {loading ? (
          <LoadingWithoutBg />
        ) : (
          thread && (
            <Fragment key={thread._id}>
              <ThreadWithChildren
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
          )
        )}
      </section>
    </main>
  );
};

export default Post;
