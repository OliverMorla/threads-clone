"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useNotification } from "@/providers/notification-provider";
import { getChats } from "@/lib/actions/chat.actions";

import Conversation from "@/components/Cards/Conversation";
import SingleChatModal from "@/components/Modals/SingleChat";

const SingleChat = ({ params: { userId } }: ChatProps) => {
  const { data: session } = useSession();
  const [conversions, setConversions] = useState<Conversations[]>([]);
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
      setConversions(data.conversations);
    };
    fetchChats();
  }, []);

  return (
    <main className="h-screen w-full flex">
      <section className="max-w-[350px] w-full border-r-[1px] border-[--octonary]">
        <section className="flex justify-between p-4 border-b-[1px] border-[--octonary]">
          <p className="font-bold">
            {
              // @ts-ignore
              session?.user.username
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
        {conversions?.length > 0 ? (
           conversions.map((conversation) => {
            
            return (
              <Conversation 
              key={conversation._id}
              username={
                // @ts-ignore
                conversation.participants.filter((participant) => participant._id !== session?.user?.id)[0].username
              }
              userImage={
                // @ts-ignore
                conversation.participants.filter((participant) => participant._id !== session?.user?.id)[0].image}
              lastMessage={conversation.lastMessage.content}
              isRead={true}
              lastMessageTimestamp={new Date(conversation.lastMessage.createdAt).toLocaleTimeString()}
              userId={
                // @ts-ignore
                conversation.participants.filter((participant) => participant._id !== session?.user?.id)[0]._id}
              />
            ) 
           })
          ) : (
            <p> No active chats available! </p>
          )}
        </section>
      </section>
      <section className="w-full">
        {userId && <SingleChatModal userId={userId} />}
      </section>
    </main>
  );
};

export default SingleChat;
