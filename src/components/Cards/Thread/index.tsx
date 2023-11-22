import Image from "next/image";
import { ThreadModalOptions } from "@/components/Modals/Thread";
import Link from "next/link";
import { useState } from "react";
const Thread = ({
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  image,
  threadId,
  userId,
  childrenThreads,
}: ThreadCardProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  return (
    <section className="relative max-w-[575px] w-full h-[auto] flex-col border-t-[1px] p-5 border-[--quinary]">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex items-center w-full">
            <Image
              src={userImage ? userImage : "/assets/icons/user.svg"}
              alt="/assets/icons/user.svg"
              width={35}
              height={35}
              className="rounded-full max-w-[35px] max-h-[35px] object-cover"
            />
            <section className="flex justify-between w-full">
              <h1 className="ml-2 font-bold">{username}</h1>
              <Image
                src={"/assets/icons/ellipsis-horizontal-sharp.svg"}
                alt="/assets/icons/verified.svg"
                width={15}
                height={15}
                className="rounded-full cursor-pointer"
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
          {image && (
            <div className="">
              <Image
                src={image}
                alt="/assets/icons/user.svg"
                width={200}
                height={200}
                className="rounded-md max-w-[250px] max-h-[425px] object-cover h-full w-full"
              />
            </div>
          )}
        </div>
      </section>
      <section className="flex gap-2 opacity-30 pr-2 py-2">
        <div className="flex items-center">
          <Image
            src="/assets/icons/like.svg"
            alt="Like"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center">
          <Link href={`@${username}/post/${threadId}`}>
            <Image
              src="/assets/icons/reply.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full"
            />
          </Link>
        </div>
        <div className="flex items-center">
          <Image
            src="/assets/icons/repeat-sharp.svg"
            alt="Reply"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>

        <div className="flex items-center">
          <Image
            src="/assets/icons/share-plane.svg"
            alt="Reply"
            width={25}
            height={25}
            className="rounded-full"
          />
        </div>
      </section>
      <section className="flex opacity-40">
        <h1 className="">{likes} likes</h1>&nbsp;&nbsp;·
        <h1 className="ml-2">{replies} replies</h1>
      </section>
      {showOptionsModal && (
        <ThreadModalOptions threadId={threadId} userId={userId} />
      )}
    </section>
  );
};

const ThreadWithChildren = ({
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  image,
  threadId,
  userId,
  childrenThreads,
}: ThreadCardProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  return (
    <section>
      <section className="relative max-w-[575px] w-full h-[auto] flex-col border-b-[1px] p-5 border-[--quinary]">
        <section>
          <div className="flex justify-between items-center">
            <div className="flex items-center w-full">
              <Image
                src={userImage ? userImage : "/assets/icons/user.svg"}
                alt="/assets/icons/user.svg"
                width={35}
                height={35}
                className="rounded-full max-w-[35px] max-h-[35px] object-cover"
              />
              <section className="flex justify-between w-full">
                <h1 className="ml-2 font-bold">{username}</h1>
                <Image
                  src={"/assets/icons/ellipsis-horizontal-sharp.svg"}
                  alt="/assets/icons/verified.svg"
                  width={15}
                  height={15}
                  className="rounded-full cursor-pointer"
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
            {image && (
              <div className="">
                <Image
                  src={image}
                  alt="/assets/icons/user.svg"
                  width={200}
                  height={200}
                  className="rounded-md max-w-[250px] max-h-[425px] object-cover h-full w-full"
                />
              </div>
            )}
          </div>
        </section>
        <section className="flex gap-2 opacity-30 pr-2 py-2">
          <div className="flex items-center">
            <Image
              src="/assets/icons/like.svg"
              alt="Like"
              width={25}
              height={25}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center">
            <Link href={`@${username}/post/${threadId}`}>
              <Image
                src="/assets/icons/reply.svg"
                alt="Reply"
                width={25}
                height={25}
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/repeat-sharp.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full"
            />
          </div>

          <div className="flex items-center">
            <Image
              src="/assets/icons/share-plane.svg"
              alt="Reply"
              width={25}
              height={25}
              className="rounded-full"
            />
          </div>
        </section>
        <section className="flex opacity-40">
          <h1 className="">{likes} likes</h1>&nbsp;&nbsp;·
          <h1 className="ml-2">{replies} replies</h1>
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
                likes={thread.likes.length}
                replies={thread.replies.length}
                image={thread.image}
                userId={thread.user._id}
                childrenThreads={null}
                userImage={thread.user.image}
              />
            );
          })}
        </section>
      ) : (
        <h1 className="text-center p-2">No replies</h1>
      )}
    </section>
  );
};
export { Thread, ThreadWithChildren };
