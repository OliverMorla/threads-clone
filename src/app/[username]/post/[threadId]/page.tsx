"use client";

import { ThreadWithChildren } from "@/components/Cards/Thread";
import { ReplyThreadModal } from "@/components/Modals/Thread";
import { motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { LoadingWithoutBg } from "@/components/Loading";
import { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";

const Post = ({ params: { threadId } }: { params: { threadId: string } }) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const {
    data: thread,
    loading,
    error,
  }: {
    data: any;
    loading: boolean;
    error: string | null;
  } = useFetch(`/api/auth/threads/${threadId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const LocalChildrenProps = [
    {
      _id: "655e514702c6dbda9e685680",
      text: "Children Thread 🍊",
      likes: [],
      replies: [
        {
          _id: "655e51s4702c6dbda9e685680",
          text: "This is a Reply🍊",
          likes: [],
          replies: [],
          user: {
            _id: "655e4f4b02c6dbda9e685619",
            username: "ogleowl",
            image: null,
          },
          image: null,
          childrenThreads: [],
          createdAt: "2023-11-22T19:06:47.401Z",
          __v: 0,
        },
      ],
      user: {
        _id: "655e4f4b02c6dbda9e685619",
        username: "ogleowl",
        image: null,
      },
      image: null,
      childrenThreads: [],
      createdAt: "2023-11-22T19:06:47.401Z",
      __v: 0,
    },
    {
      _id: "655e514702c6dbda9e68s680",
      text: "Second Children Thread 😎",
      likes: [],
      replies: [],
      user: {
        _id: "655e4f4b02c6dbda9e685619",
        username: "ogleowl",
        image: null,
      },
      image: null,
      childrenThreads: [
        {
          _id: "655e514702c6dbda9e685680",
          text: "Children Thread of Second Children Thread 🍊",
          likes: [],
          replies: [],
          user: {
            _id: "655e4f4b02c6dbda9e685619",
            username: "ogleowl",
            image: null,
          },
          image: null,
          childrenThreads: [],
          createdAt: "2023-11-22T19:06:47.401Z",
          __v: 0,
        },
      ],
      createdAt: "2023-11-22T19:06:47.401Z",
      __v: 0,
    },
  ];

  // debugging purposes
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
                likes={thread.likes}
                replies={thread.replies}
                threadImage={thread.image}
                userId={thread.user._id}
                childrenThreads={thread.childrenThreads}
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
