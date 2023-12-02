import Image from "next/image";
import Link from "next/link";

const Conversation = ({
  userId,
  userImage,
  username,
  lastMessageTimestamp,
  lastMessage,
  isRead,
}: ConversationProps) => {
  return (
    <Link href={`/chat/${userId}`}>
      <section className="flex items-center justify-between cursor-pointer">
        <section className="flex">
          <section className="rounded-full bg-[--septenary] h-fit w-fit border-[--octonary] border-[1px]">
            <Image
              src={userImage}
              width={55}
              height={55}
              alt="user-icon"
              className="max-w-[55px] max-h-[55px] h-[55px] w-[55px] rounded-full object-cover"
            />
          </section>
          <section className="flex flex-col ml-2 text-sm">
            <p className="font-bold">{username}</p>
            <section className="flex flex-col">
              <p>{lastMessage}</p>
              <p>{lastMessageTimestamp}</p>
            </section>
          </section>
        </section>
        <section>
          {isRead && (
            <div className="bg-cyan-500 w-1 h-1 rounded-full">&nbsp;</div>
          )}
        </section>
      </section>
    </Link>
  );
};

export default Conversation;
