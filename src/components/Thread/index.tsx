import Image from "next/image";
const Thread = ({
  username,
  userImage,
  text,
  createdAt,
  likes,
  replies,
  threadId,
  userId,
}: ThreadProps) => {
  return (
    <section className="max-w-[500px] w-full h-[auto] flex-col border-t-[1px] p-5">
      <section>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={"/assets/icons/user.svg"}
              alt="/assets/icons/user.svg"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h1 className="ml-2 font-bold">{username}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h1>{text}</h1>
          <h1>{new Date(createdAt).toLocaleTimeString()}</h1>
        </div>
      </section>
      <section className="flex gap-2 opacity-30">
        <div className="flex items-center">
          <Image
            src="/assets/icons/like.svg"
            alt="Like"
            width={25}
            height={25}
            className="rounded-full"
          />
          <h1 className="ml-2">{likes} likes</h1>
        </div>
        <div className="flex items-center">
          <Image
            src="/assets/icons/reply.svg"
            alt="Reply"
            width={25}
            height={25}
            className="rounded-full"
          />
          <h1 className="ml-2">{replies} replies</h1>
        </div>
      </section>
    </section>
  );
};

export default Thread;
