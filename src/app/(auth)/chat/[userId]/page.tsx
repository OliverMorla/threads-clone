"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

import Conversation from "@/components/Cards/Conversation";
import SingleChatModal from "@/components/Modals/SingleChat";

const SingleChat = ({ params: { userId } }: ChatProps) => {
  const { data: session } = useSession();

  const messages = [
    {
      chatId: "1",
    },
  ];

  return (
    <main className="h-screen w-full flex">
      <section className="max-w-[350px] w-full border-r-[1px] border-[--octonary]">
        <section className="flex justify-between p-4 border-b-[1px] border-[--octonary]">
          <p className="font-bold">johnDoe</p>
          <Image
            src={"/assets/icons/create-chat.svg"}
            width={25}
            height={25}
            alt="create-chat.svg"
            className="cursor-pointer"
          />
        </section>
        <section className="p-4">
          <p>Messages</p>
        </section>
        <section className="mx-4 my-2 flex flex-col gap-2">
          <Conversation
            isRead={true}
            lastMessage="Hey!"
            lastMessageTimestamp="7d"
            username="oliverm11_"
            userImage="/assets/icons/user.svg"
            userId="fjshkjd2dhk12jkdh12"
            key={1}
          />
          <Conversation
            isRead={true}
            lastMessage="Hey!"
            lastMessageTimestamp="7d"
            username="oliverm11_"
            userImage="/assets/icons/user.svg"
            userId="fjshkjd2dhk12jkdh12"
            key={2}
          />
          <Conversation
            isRead={true}
            lastMessage="Hey!"
            lastMessageTimestamp="7d"
            username="oliverm11_"
            userImage="/assets/icons/user.svg"
            userId="fjshkjd2dhk12jkdh12"
            key={2}
          />
          <Conversation
            isRead={true}
            lastMessage="Hey!"
            lastMessageTimestamp="7d"
            username="oliverm11_"
            userImage="/assets/icons/user.svg"
            userId="fjshkjd2dhk12jkdh12"
            key={2}
          />
          <Conversation
            isRead={true}
            lastMessage="Hey!"
            lastMessageTimestamp="7d"
            username="oliverm11_"
            userImage="/assets/icons/user.svg"
            userId="fjshkjd2dhk12jkdh12"
            key={2}
          />
        </section>
      </section>
      <section className="w-full">
        {userId && (
          <SingleChatModal
            userId={userId}
            username={"johnDoe"}
            messages={messages}
            userImage=""
          />
        )}
      </section>
    </main>
  );
};

export default SingleChat;
