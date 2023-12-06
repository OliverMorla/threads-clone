"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useNotification } from "@/providers/notification-provider";
import Notification from "@/components/Modals/Notification";
import Conversation from "@/components/Cards/Conversation";
import { getChats } from "@/lib/actions/chat.actions";

const Chat = () => {
  const { data: session } = useSession();
  const [activeChats, setActiveChats] = useState<Chats[]>([]);
  const { notification, setNotification } = useNotification();

  useEffect(() => {
    const fetchChats = async () => {
      const data = await getChats();
      if (!data.ok) {
        setNotification({
          message: data.message,
          type: "error",
          seconds: 4,
        });
      }

      setActiveChats(data.data[0].activeChats);
    };
    fetchChats();
  }, []);

  return (
    <main className="h-screen w-full flex m-2">
      {notification.message.length > 0 && (
        <Notification
          message={notification.message}
          type={notification.type}
          seconds={notification.seconds}
        />
      )}
      <section className="max-w-[350px] w-full">
        <section className="flex justify-between p-4">
          <p className="font-bold">
            {
              // @ts-ignore
              session?.user?.username
            }
          </p>
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
          {activeChats.length > 0 ? (
            activeChats.map((user) => (
              <Conversation
                isRead={true}
                lastMessage="Hey!"
                lastMessageTimestamp="7d"
                username={user.username}
                userImage={user.image}
                userId={user._id}
                key={user._id}
              />
            ))
          ) : (
            <p> No active chats available! </p>
          )}
        </section>
      </section>
      <section></section>
    </main>
  );
};

export default Chat;
