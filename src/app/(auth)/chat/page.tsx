"use client";

import Conversation from "@/components/Cards/Conversation";
import User from "@/lib/models/user.model";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const Chat = () => {
  const { data: session } = useSession();

  // if user is not logged in, redirect to login page
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <main className="h-screen w-full flex m-2">
      <section className="max-w-[350px] w-full">
        <section className="flex justify-between p-4">
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
      <section></section>
    </main>
  );
};

export default Chat;
