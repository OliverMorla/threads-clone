import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
  ReplyThreadModal,
  StartThreadModal,
  ThreadModalOptions,
} from "@/components/Modals/Thread";

import { LikeThread } from "@/lib/options/thread.options";
import { addThreadLike } from "@/redux/slices/thread-slice";

// Thread without children
const Thread = ({
  userId,
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  threadImage,
  threadId,
}: ThreadCardProps) => {
  const dispatch = useDispatch();

  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);

  const { data: session } = useSession();

  // handle thread like and dispatches the thread to the redux store
  const handleLikeThread = async () => {
    const data = await LikeThread(threadId);

    if (data) {
      dispatch(addThreadLike({ threadId, userId, username, userImage }));
    }
  };

  return (
    <section>
      <section className="relative max-w-[575px] w-full h-[auto] flex-col border-t-[1px] py-4 border-[--octonary]">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex items-center w-full">
              <section className="rounded-full bg-[--septenary] max-w-[35px] max-h-[35px] overflow-hidden flex justify-center items-center">
                <Image
                  src={userImage ? userImage : "/assets/icons/user.svg"}
                  alt="/assets/icons/user.svg"
                  width={35}
                  height={35}
                  className="max-w-[35px] max-h-[35px] min-h-[35px] object-cover border-[--octonary] border-[1px]"
                />
              </section>
              <section className="flex justify-between w-full">
                <h1 className="ml-2 font-bold">
                  <Link href={`/@${username}`}>{username}</Link>
                </h1>
                <Image
                  src={"/assets/icons/ellipsis-horizontal-sharp.svg"}
                  alt="/assets/icons/verified.svg"
                  width={15}
                  height={15}
                  className="rounded-full cursor-pointer hover:scale-105  hover:opacity-60 transition-all"
                  onClick={() => setShowOptionsModal(!showOptionsModal)}
                />
              </section>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mt-2">
              <h1>{text}</h1>
              <h1>{new Date(createdAt).toLocaleTimeString()}</h1>
            </div>
            {threadImage && (
              <div>
                <Image
                  src={threadImage}
                  alt="/assets/icons/user.svg"
                  width={200}
                  height={200}
                  className="rounded-md max-w-[250px] max-h-[425px] object-cover h-full w-full"
                />
              </div>
            )}
          </div>
        </section>
        <section className="flex gap-4 pr-2 py-2">
          <div className="flex items-center">
            {
              // @ts-ignore
              likes?.find((user) => user._id === session?.user?.id) ? (
                <Image
                  src="/assets/icons/like-filled.svg"
                  alt="Like"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                  onClick={handleLikeThread}
                />
              ) : (
                <Image
                  src="/assets/icons/like.svg"
                  alt="Like"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                  onClick={handleLikeThread}
                />
              )
            }
          </div>
          <div className="flex items-center">
            <Link href={`/@${username}/post/${threadId}`}>
              <Image
                src="/assets/icons/reply.svg"
                alt="Reply"
                width={25}
                height={25}
                className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/repeat-sharp.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/share-plane.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105  hover:opacity-60 transition-all"
            />
          </div>
        </section>
        <section className="flex opacity-40">
          <h1>{replies?.length} replies</h1>&nbsp;&nbsp;·
          <h1 className="ml-2">{likes?.length} likes</h1>
        </section>
        {showOptionsModal && (
          <ThreadModalOptions threadId={threadId} userId={userId} />
        )}
      </section>
    </section>
  );
};

// Thread with children
const ThreadWithChildren = ({
  userId,
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  threadImage,
  threadId,
  childrenThreads,
}: ThreadCardWithChildrenProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showStartThreadModal, setShowStartThreadModal] =
    useState<boolean>(false);

  return (
    <section className="flex flex-col">
      <section className="relative max-w-[575px] w-full h-[auto] flex-col border-[--octonary]">
        <section className="flex flex-row">
          <div className="flex justify-between items-start">
            <section className="flex flex-col items-center h-full">
              <div className="flex items-center w-full">
                <Image
                  src={userImage ? userImage : "/assets/icons/user.svg"}
                  alt="/assets/icons/user.svg"
                  width={35}
                  height={35}
                  className="rounded-full max-w-[35px] max-h-[35px] object-cover border-[--octonary] border-[1px]"
                />
              </div>
              <section className="bg-[--octonary] w-[1px] h-full block my-1">
                &nbsp;
              </section>
            </section>
          </div>

          <div className="flex flex-col flex-grow">
            <section className="flex justify-between w-full">
              <h1 className="ml-2 font-bold">{username}</h1>
              <Image
                src={"/assets/icons/ellipsis-horizontal-sharp.svg"}
                alt="/assets/icons/verified.svg"
                width={15}
                height={15}
                className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                onClick={() => setShowOptionsModal(!showOptionsModal)}
              />
            </section>

            <div className="flex justify-between items-center mt-2">
              <h1>{text}</h1>
              <h1>{new Date(createdAt).toLocaleTimeString()}</h1>
            </div>

            {threadImage && (
              <div className="">
                <Image
                  src={threadImage}
                  alt="/assets/icons/user.svg"
                  width={200}
                  height={200}
                  className="rounded-md max-w-[250px] max-h-[425px] object-cover h-full w-full"
                />
              </div>
            )}

            <section className="flex gap-4 pr-2 py-2">
              <div className="flex items-center">
                <Image
                  src="/assets/icons/like.svg"
                  alt="Like"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                />
              </div>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/reply.svg"
                  alt="Reply"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                  onClick={() => setShowCreateModal(!showCreateModal)}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/repeat-sharp.svg"
                  alt="Reply"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                  onClick={() => setShowStartThreadModal(!showCreateModal)}
                />
              </div>
              <div className="flex items-center">
                <Image
                  src="/assets/icons/share-plane.svg"
                  alt="Reply"
                  width={25}
                  height={25}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                />
              </div>
            </section>

            <section className="flex opacity-40 pb-2">
              <h1>{replies?.length} replies</h1>&nbsp;&nbsp;·
              <h1 className="ml-2">{likes?.length} likes</h1>
            </section>
          </div>
        </section>

        {showOptionsModal && (
          <ThreadModalOptions threadId={threadId} userId={userId} />
        )}

        {childrenThreads ? (
          <section className="flex flex-col">
            {childrenThreads.map((thread) => {
              return (
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
                  userImage={thread.user.image}
                  childrenThreads={thread.childrenThreads}
                />
              );
            })}
          </section>
        ) : null}
      </section>

      {showCreateModal ? (
        <motion.section className="w-full h-full top-0 left-0 absolute flex justify-center items-center">
          <motion.div
            className="w-full h-full bg-black opacity-50 absolute cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(!showCreateModal)}
          />
          <ReplyThreadModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            originalThreadId={threadId}
            originalThreadCreatedAt={createdAt}
            originalThreadText={text}
            originalThreadUsername={username}
            originalThreadUserImage={userImage}
            originalThreadImage={threadImage}
          />
        </motion.section>
      ) : null}

      {showStartThreadModal ? (
        <motion.section className="w-full h-full top-0 left-0 absolute flex justify-center items-center">
          <motion.div
            className="w-full h-full bg-black opacity-50 absolute cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowStartThreadModal(!showStartThreadModal)}
          />
          <StartThreadModal
            showStartThreadModal={showStartThreadModal}
            setShowStartThreadModal={setShowStartThreadModal}
            originalThreadId={threadId}
            originalThreadCreatedAt={createdAt}
            originalThreadText={text}
            originalThreadUsername={username}
            originalThreadUserImage={userImage}
            originalThreadImage={threadImage}
          />
        </motion.section>
      ) : null}

      {replies ? (
        <section className="flex flex-col">
          {replies.map((thread) => {
            if (thread.isReply && thread.parentId === threadId) {
              return (
                <Thread
                  key={thread?._id}
                  text={thread?.text}
                  threadId={thread?._id}
                  username={thread?.user?.username}
                  createdAt={thread?.createdAt}
                  likes={thread?.likes}
                  replies={thread?.replies}
                  threadImage={thread?.image}
                  userId={thread?.user?._id}
                  userImage={thread?.user?.image}
                />
              );
            }
          })}
        </section>
      ) : (
        <h1 className="text-center p-2">No replies</h1>
      )}
    </section>
  );
};

const ThreadWithReplies = ({
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  threadImage,
  threadId,
  userId,
  childrenThreads,
}: ThreadCardWithChildrenProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  return (
    <section className="flex flex-col">
      <section className="relative max-w-[575px] w-full h-[auto] flex-col border-b-[1px] border-[--octonary]">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex items-center w-full">
              <Image
                src={userImage ? userImage : "/assets/icons/user.svg"}
                alt="/assets/icons/user.svg"
                width={35}
                height={35}
                className="rounded-full max-w-[35px] max-h-[35px] object-cover border-[--octonary] border-[1px]"
              />
              <section className="flex justify-between w-full">
                <h1 className="ml-2 font-bold">{username}</h1>
                <Image
                  src={"/assets/icons/ellipsis-horizontal-sharp.svg"}
                  alt="/assets/icons/verified.svg"
                  width={15}
                  height={15}
                  className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
                  onClick={() => setShowOptionsModal(!showOptionsModal)}
                />
              </section>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mt-2">
              <h1>{text}</h1>
              <h1>{new Date(createdAt).toLocaleTimeString()}</h1>
            </div>
            {threadImage && (
              <div className="">
                <Image
                  src={threadImage}
                  alt="/assets/icons/user.svg"
                  width={200}
                  height={200}
                  className="rounded-md max-w-[250px] max-h-[425px] object-cover h-full w-full"
                />
              </div>
            )}
          </div>
        </section>
        <section className="flex gap-4 pr-2 py-2">
          <div className="flex items-center">
            <Image
              src="/assets/icons/like.svg"
              alt="Like"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/reply.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
              onClick={() => setShowCreateModal(!showCreateModal)}
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/repeat-sharp.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
            />
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/share-plane.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full cursor-pointer hover:scale-105 hover:opacity-60 transition-all"
            />
          </div>
        </section>
        <section className="flex opacity-40 pb-2">
          <h1>{replies?.length} replies</h1>&nbsp;&nbsp;·
          <h1 className="ml-2">{likes?.length} likes</h1>
        </section>
        {showOptionsModal && (
          <ThreadModalOptions threadId={threadId} userId={userId} />
        )}
      </section>

      {childrenThreads ? (
        <section className="flex flex-col">
          {childrenThreads.map((thread) => {
            return (
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
            );
          })}
        </section>
      ) : (
        <h1 className="text-center p-2">No replies</h1>
      )}

      {showCreateModal ? (
        <motion.section className="w-full h-full top-0 left-0 absolute flex justify-center items-center">
          <motion.div
            className="w-full h-full bg-black opacity-50 absolute cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(!showCreateModal)}
          />
          <ReplyThreadModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            originalThreadId={threadId}
            originalThreadCreatedAt={createdAt}
            originalThreadText={text}
            originalThreadUsername={username}
            originalThreadImage={userImage}
            originalThreadUserImage={userImage}
          />
        </motion.section>
      ) : null}

    </section>
  );
};

export { Thread, ThreadWithChildren, ThreadWithReplies };
