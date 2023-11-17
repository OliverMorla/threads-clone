import Image from "next/image";
import { ThreadModalOptions } from "@/components/Modals/Thread";
import { useState } from "react";
const Thread = ({
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
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
              src={"/assets/icons/user.svg"}
              alt="/assets/icons/user.svg"
              width={35}
              height={35}
              className="rounded-full"
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
        <div className="flex justify-between items-center mt-2">
          <h1>{text}</h1>
          <h1>{new Date(createdAt).toLocaleTimeString()}</h1>
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
          <Image
            src="/assets/icons/reply.svg"
            alt="Reply"
            width={25}
            height={25}
            className="rounded-full"
          />
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
        <ThreadModalOptions
          // setShowOptionsModal={setShowOptionsModal}
          // threadId={threadId}
          userId={userId}
        />
      )}
    </section>
  );
};

export { Thread };
