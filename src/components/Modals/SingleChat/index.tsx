"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { socket } from "@/lib/socket";
import Image from "next/image";

import { SenderMessage, RecipientMessage } from "@/components/Cards/Message";

import { getMessages, sendMessage } from "@/lib/actions/messasge.actions";
import { GetUserById } from "@/lib/actions/user.actions";

const SingleChatModal = ({ userId }: SingleChatModalProps) => {
  const ChatBodyRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<UserChatProps>();
  const [messages, setMessages] = useState<MessagesWithUsers[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const { data: session } = useSession();

  const FetchUserById = async () => {
    const data = await GetUserById(userId);
    if (!data.ok) return console.log(data.message);
    setUser(data.data);
  };

  const FetchMessages = async () => {
    const data = await getMessages(userId);
    if (!data.ok) return console.log(data.message);
    setMessages(data.data);
  };

  const handleSendMessage = async () => {
    const data = await sendMessage(messageInput, userId);
    if (data.ok) {
      const newMessage = {
        _id: `${Math.floor(Math.random() * 249012323)}`,
        conversationId: userId,
        sender: {
          // @ts-ignore
          _id: session?.user.id,
          // @ts-ignore
          username: session?.user.username,
          image: session?.user?.image,
        },
        recipient: {
          _id: userId,
          username: user?.username,
          image: user?.image,
        },
        content: messageInput,
        status: "sent",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        __v: 0,
      };
      socket.emit("send-message", newMessage);
      await FetchMessages();
      await FetchUserById();
    }
  };

  useEffect(() => {
    FetchMessages();
    FetchUserById();
  }, []);

  useEffect(() => {
    // Setup the socket listener
    socket.on("message-input", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        message as MessagesWithUsers,
      ]);
    });

    // Cleanup function
    return () => {
      socket.off("message-input");
    };
  }, [user, messages]);


  useEffect(() => {
    ChatBodyRef.current?.scrollTo({
      top: ChatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="flex flex-col w-full h-full">
      <section className="flex w-full border-b-[1px] border-[--octonary] items-center p-2">
        <section className="rounded-full bg-[--septenary] h-fit w-fit border-[--octonary] border-[1px] ml-2">
          <Image
            src={user?.image ? user.image : "/assets/icons/user.svg"}
            width={55}
            height={55}
            alt="user-icon"
            className="max-w-[55px] max-h-[55px] h-[55px] w-[55px] rounded-full object-cover"
          />
        </section>
        <section className="flex w-full justify-between mx-2">
          <p className="font-bold">{user?.username}</p>
          <Image
            src={"/assets/icons/info.svg"}
            width={35}
            height={35}
            alt="info"
          />
        </section>
      </section>
      <section className="flex flex-col flex-grow h-full overflow-y-scroll gap-3 mt-2" ref={ChatBodyRef}>
        {messages?.map((message) => {
          if (
            // @ts-ignore
            message.sender._id === session?.user.id
          ) {
            return (
              <SenderMessage
                content={message.content}
                username={message.sender.username}
                userImage={message.sender.image}
                createdAt={message.createdAt}
                key={message._id}
              />
            );
          } else {
            return (
              <RecipientMessage
                content={message.content}
                username={message.sender.username}
                userImage={message.sender.image}
                createdAt={message.createdAt}
                key={message._id}
              />
            );
          }
        })}
      </section>
      <section className="flex justify-center">
        <input
          type="text"
          name="message"
          placeholder="Message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
              setMessageInput("");
            }
          }}
          className="bg-transparent appearance-none border w-[95%] p-2 border-[--octonary] border-[1px] outline-none"
        />
      </section>
    </section>
  );
};

export default SingleChatModal;
