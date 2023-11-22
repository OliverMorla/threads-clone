"use client";
import { useSession } from "next-auth/react";
import { SetStateAction, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { deleteThread, addThread } from "@/redux/slices/thread-slice";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import { fadeVariant1 } from "@/config/framer-animations";

const CreateThreadModal = ({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const IMAGE_UPLOAD_URL = process.env.NEXT_PUBLIC_IMGBB_URL;

  const threadImageRef = useRef<HTMLInputElement>(null);
  const { data: session, status } = useSession();
  const [threadImage, setThreadImage] = useState<any>(null);
  const [threadImageUpload, setThreadImageUpload] = useState<any>(null);

  const dispatch = useDispatch();

  const [threadInput, setThreadInput] = useState({
    text: "",
    // @ts-ignore
    userId: session?.user.id,
    image: "",
  });

  console.log(threadInput);
  console.log(threadImage);

  const handleThreadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreadImage(URL.createObjectURL(e.target.files?.item(0) as Blob));
    setThreadImageUpload(e.target.files?.item(0));
  };

  const handleFileClick = () => {
    threadImageRef.current?.click();
  };

  const handleThreadImageUpload = async () => {
    const form = new FormData();
    form.append("image", threadImageUpload);

    try {
      const res = await fetch(IMAGE_UPLOAD_URL as string, {
        method: "POST",
        body: form,
      });

      const data = (await res.json()) as ImageUploadResponse;

      if (data.success) {
        const updatedThreadInput = {
          ...threadInput,
          image: data.data.url,
        };
        setThreadInput(updatedThreadInput);

        return updatedThreadInput;
      }
      return null;
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      return null;
    }
  };

  const createThread = async () => {
    const updatedThreadInput = await handleThreadImageUpload();
    console.log(updatedThreadInput);

    if (updatedThreadInput) {
      console.log(updatedThreadInput);
      try {
        const res = await fetch("/api/auth/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedThreadInput),
        });

        const data = await res.json();
        if (data.ok) {
          alert(data.message);
          dispatch(
            addThread({
              text: threadInput.text,
              image: threadInput.image,
              user: {
                // @ts-ignore
                image: session?.user.image,
                // @ts-ignore
                username: session?.user.username,
              },
            })
          );
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    } else {
      try {
        const res = await fetch("/api/auth/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(threadInput),
        });

        const data = await res.json();
        if (data.ok) {
          alert(data.message);
          dispatch(
            addThread({
              text: threadInput.text,
              image: threadInput.image,
              user: {
                // @ts-ignore
                image: session?.user.image,
                // @ts-ignore
                username: session?.user.username,
              },
            })
          );
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    }
  };

  return (
    <div className="bg-zinc-900 text-white w-[625px] h-auto flex justify-start items-start flex-col absolute rounded-xl p-4 z-20 m-auto">
      <h1 className="text-2xl font-bold absolute -translate-y-20 self-center">
        New Thread
      </h1>
      <section className="flex w-full">
        <section className="rounded-full bg-[--septenary] h-fit w-fit">
          <Image
            src={session?.user?.image! || "/assets/icons/user.svg"}
            width={75}
            height={75}
            className="p-2 rounded-full max-w-[75px] max-h-[75px] object-cover"
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
          <Image
            src={"/assets/icons/image.svg"}
            width={20}
            height={20}
            alt="image"
            className="cursor-pointer m-2"
            onClick={handleFileClick}
          />
          <input
            type="file"
            name="thread-image"
            className="hidden"
            onChange={handleThreadImage}
            ref={threadImageRef}
          />
          {threadImage ? (
            <Image
              src={threadImage}
              width={100}
              height={100}
              alt="thread-image"
            />
          ) : null}
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

const ThreadModalOptions = ({ userId, threadId }: ThreadModalOptionsProps) => {
  const handleThreads = async (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.name) {
      case "delete":
        try {
          const res = await fetch("/api/auth/threads", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ threadId }),
          });

          const data = await res.json();
          console.log(data);
          if (data.ok) {
            alert(data.message);
            dispatch(deleteThread({ threadId }));
          }
          throw new Error(data.message);
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;

      case "edit":
        break;

      case "bookmark":
        try {
          const res = await fetch("/api/auth/bookmarks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ threadId }),
          });
          const data = await res.json();

          if (data.ok) {
            return alert(data.message);
          }
          throw new Error(data.message);
        } catch (err) {
          if (err instanceof Error) alert(err.message);
        }
        break;
      default:
        break;
    }
  };

  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  return (
    <motion.div
      variants={fadeVariant1}
      initial="hidden"
      animate="visible"
      className="bg-zinc-900 text-white w-auto h-auto flex justify-start items-start flex-col right-0 top-0 absolute translate-x-20"
    >
      <ul className="flex flex-col justify-start">
        {
          // @ts-ignore
          session?.user.id === userId ? (
            <li className="hover:bg-[--primary-hover] transition-colors">
              <button className="p-2" name="delete" onClick={handleThreads}>
                Delete
              </button>
            </li>
          ) : null
        }

        {
          // @ts-ignore
          session?.user.id === userId ? (
            <li className="hover:bg-[--primary-hover] transition-colors">
              <button className="p-2" name="edit" onClick={handleThreads}>
                Edit
              </button>
            </li>
          ) : null
        }

        {
          // @ts-ignore
          session?.user ? (
            <li className="hover:bg-[--primary-hover] transition-colors">
              <button className="p-2" name="bookmark" onClick={handleThreads}>
                Bookmark
              </button>
            </li>
          ) : null
        }

        <li className="hover:bg-[--primary-hover] transition-colors">
          <button className="p-2" name="share" onClick={handleThreads}>
            Share
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export { CreateThreadModal, ThreadModalOptions };
