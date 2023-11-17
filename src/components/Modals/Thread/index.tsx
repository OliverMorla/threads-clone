"use client";
import { useSession } from "next-auth/react";
import { SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

const CreateThreadModal = ({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();

  const [threadInput, setThreadInput] = useState({
    text: "",
    // @ts-ignore
    userId: session?.user.id,
  });

  const createThread = async () => {
    try {
      const res = await fetch("/api/auth/threads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(threadInput),
      });

      const data = await res.json();
      if (data.ok) {
        alert(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="bg-zinc-900 text-white w-[625px] h-auto flex justify-start items-start flex-col absolute rounded-xl p-4 z-20 m-auto">
      <h1 className="text-2xl font-bold absolute -translate-y-20 self-center">
        New Thread
      </h1>
      <section className="flex w-full">
        <section className="rounded-full bg-[--septenary] h-fit">
          <Image
            src={"/assets/icons/user.svg"}
            width={75}
            height={75}
            className="p-2"
            alt="user"
          />
        </section>
        <section className="flex flex-col w-full">
          <h2 className="font-bold flex items-center justify-between px-2">
            {
              // @ts-ignore
              session?.user.username
            }
          </h2>
          <button
            className="w-12 h-12 absolute top-0 right-0"
            onClick={() => setShowCreateModal(!showCreateModal)}
          >
            <Image
              src={"/assets/icons/close-circle.svg"}
              width={20}
              height={20}
              alt="arrow-down"
            />
          </button>
          <input
            type="text"
            name="new-thread-input"
            value={threadInput.text}
            placeholder="Start a thread..."
            onChange={(e) =>
              setThreadInput({ ...threadInput, text: e.target.value })
            }
            className="bg-transparent appearance-none text-white p-2 outline-none"
          />
        </section>
      </section>
      <section className="flex self-center">
        <EmojiPicker
          width={575}
          height={300}
          theme={"dark" as any}
          onEmojiClick={(chosenEmoji, event) =>
            setThreadInput((prev) => ({
              ...prev,
              text: prev.text.concat(chosenEmoji.emoji),
            }))
          }
        />
      </section>
      <section className="w-full flex justify-between items-center">
        <h2 className="opacity-60">Your followers can reply</h2>
        <button
          className="bg-zinc-500 text-white px-4 py-2 rounded-xl mt-2 hover:bg-zinc-600 transition-all"
          onClick={createThread}
        >
          Post
        </button>
      </section>
    </div>
  );
};

const ThreadModalOptions = ({ userId }: ThreadModalOptionsProps) => {
  const { data: session, status } = useSession();

  return (
    <motion.div className="bg-zinc-900 text-white w-auto h-auto flex justify-start items-start flex-col right-0 top-0 absolute translate-x-20">
      <ul>
        {
          // @ts-ignore
          session?.user.id === userId ? <li className="p-2">Delete</li> : null
        }

        {
          // @ts-ignore
          session?.user.id === userId ? <li className="p-2">Edit</li> : null
        }

        <li className="p-2">Share</li>
      </ul>
    </motion.div>
  );
};

export { CreateThreadModal, ThreadModalOptions };
