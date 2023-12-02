"use client";

import { SetStateAction, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";

import { fadeVariant1 } from "@/config/framer-animations";

import { deleteThread, addThread } from "@/redux/slices/thread-slice";

import {
  ReplyToThread,
  CreateThread,
  StartThread,
} from "@/lib/options/thread.options";

import { UploadButton } from "@/utils/uploadthing";
import Notification from "../Notification";

const CreateThreadModal = ({
  showCreateModal,
  setShowCreateModal,
}: {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const threadImageRef = useRef<HTMLInputElement>(null);

  const [threadImage, setThreadImage] = useState<any>(null);
  const [threadImageUpload, setThreadImageUpload] = useState<any>(null);
  const [threadInput, setThreadInput] = useState<ThreadInput>({
    // @ts-ignore
    userId: session?.user.id,
    text: "",
    image: "",
  });

  // handle thread image and sets the image to the threadImage state
  const handleThreadImage = (image: File[]) => {
    setThreadImage(URL.createObjectURL(image[0]));
    // setThreadInput({
    //   ...threadInput,
    //   image: URL.createObjectURL(e.target.files?.item(0) as Blob),
    // });
    setThreadImageUpload(image[0]);

    return image;
  };

  // handle thread image click and opens the file explorer
  const handleFileClick = () => {
    threadImageRef.current?.click();
  };

  // handle thread creation and dispatches the thread to the redux store
  const handleCreateThread = async () => {
    const data = await CreateThread(threadInput);

    if (data?.ok) {
      dispatch(
        addThread({
          text: threadInput.text,
          image: threadInput.image,
          user: {
            // @ts-ignore
            _id: session?.user.id,
            // @ts-ignore
            image: session?.user.image,
            // @ts-ignore
            username: session?.user.username,
          },
        })
      );
      alert(data?.message);
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
            className="p-2 rounded-full max-w-[75px] max-h-[75px] min-h-[75px]  object-cover"
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
          <UploadButton
            endpoint={"media"}
            onBeforeUploadBegin={(file) => handleThreadImage(file)}
            onUploadBegin={(res) => {
              console.log(res);
            }}
            onClientUploadComplete={(res) =>
              setThreadInput((prevState) => {
                return {
                  ...prevState,
                  image: res[0].url,
                };
              })
            }
            config={{
              mode: "manual",
            }}
            appearance={{
              container: {
                width: "fit-content",
                height: "fit-content",
              },
              button: {
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "transparent",
              },
            }}
            content={{
              button(arg) {
                return (
                  <Image
                    src={"/assets/icons/image.svg"}
                    width={20}
                    height={20}
                    alt="image"
                    className="cursor-pointer m-2"
                  />
                );
              },
            }}
            onUploadProgress={(progress) => console.log(progress)}
            onUploadError={(err) => console.log(err)}
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
          onClick={handleCreateThread}
        >
          Post
        </button>
      </section>
    </div>
  );
};

// thread modal options
const ThreadModalOptions = ({ userId, threadId }: ThreadModalOptionsProps) => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    seconds: 0,
  });

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
      className="bg-zinc-900 text-white w-auto h-auto flex justify-start items-start flex-col right-0 top-0 absolute translate-x-28"
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

// reply thread modal
const ReplyThreadModal = ({
  showCreateModal,
  setShowCreateModal,
  originalThreadId,
  originalThreadUsername,
  originalThreadText,
  originalThreadImage,
  originalThreadCreatedAt,
  originalThreadUserImage,
}: {
  showCreateModal: boolean;
  setShowCreateModal: React.Dispatch<SetStateAction<boolean>>;
  originalThreadId: string;
  originalThreadUsername: string;
  originalThreadText: string;
  originalThreadImage: string;
  originalThreadCreatedAt: string;
  originalThreadUserImage: string;
}) => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const threadImageRef = useRef<HTMLInputElement>(null);

  const [threadImage, setThreadImage] = useState<any>(null);
  const [threadImageUpload, setThreadImageUpload] = useState<any>(null);
  const [threadInput, setThreadInput] = useState<ReplyInput>({
    originalThreadId,
    // @ts-ignore
    userId: session?.user.id,
    text: "",
    image: "",
  });

  // handle thread image and sets the image to the threadImage state
  const handleThreadImage = (image: File[]) => {
    setThreadImage(URL.createObjectURL(image[0]));
    // setThreadInput({
    //   ...threadInput,
    //   image: URL.createObjectURL(e.target.files?.item(0) as Blob),
    // });
    setThreadImageUpload(image[0]);

    return image;
  };

  // handle thread image click and opens the file explorer
  const handleFileClick = () => {
    threadImageRef.current?.click();
  };

  // handle thread creation and dispatches the thread to the redux store
  const handleCreateThread = async () => {
    const data = await ReplyToThread(threadInput);
    if (data?.ok) {
      alert(data?.message);
    }
  };

  return (
    <div className="bg-zinc-900 text-white w-[625px] h-auto flex justify-start items-start flex-col absolute rounded-xl p-4 z-20 m-auto gap-2">
      <h1 className="text-2xl font-bold absolute -translate-y-20 self-center">
        Reply
      </h1>
      {/* Original Thread */}
      <section className="flex w-full">
        <section className="rounded-full bg-[--septenary] h-fit w-fit">
          <Image
            src={originalThreadUserImage || "/assets/icons/user.svg"}
            width={75}
            height={75}
            className="p-2 rounded-full max-w-[75px] max-h-[75px] object-cover"
            alt="user"
          />
        </section>
        <section className="flex flex-col w-full">
          <h2 className="font-bold flex items-center justify-between px-2">
            {originalThreadUsername}
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
            value={originalThreadText}
            placeholder="Start a thread..."
            readOnly
            className="bg-transparent appearance-none text-white p-2 outline-none"
          />
          {originalThreadImage ? (
            <Image
              src={originalThreadImage}
              width={100}
              height={100}
              alt="thread-image"
            />
          ) : null}
        </section>
      </section>
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
            placeholder="Reply to this thread..."
            onChange={(e) =>
              setThreadInput({ ...threadInput, text: e.target.value })
            }
            className="bg-transparent appearance-none text-white p-2 outline-none"
          />
          <UploadButton
            endpoint={"media"}
            onBeforeUploadBegin={(file) => handleThreadImage(file)}
            onUploadBegin={(res) => {
              console.log(res);
            }}
            onClientUploadComplete={(res) =>
              setThreadInput((prevState) => {
                return {
                  ...prevState,
                  image: res[0].url,
                };
              })
            }
            config={{
              mode: "manual",
            }}
            appearance={{
              container: {
                width: "fit-content",
                height: "fit-content",
              },
              button: {
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "transparent",
              },
            }}
            content={{
              button(arg) {
                return (
                  <Image
                    src={"/assets/icons/image.svg"}
                    width={20}
                    height={20}
                    alt="image"
                    className="cursor-pointer m-2"
                  />
                );
              },
            }}
            onUploadProgress={(progress) => console.log(progress)}
            onUploadError={(err) => console.log(err)}
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
          onClick={handleCreateThread}
        >
          Post
        </button>
      </section>
    </div>
  );
};

const StartThreadModal = ({
  showStartThreadModal,
  setShowStartThreadModal,
  originalThreadId,
  originalThreadUsername,
  originalThreadText,
  originalThreadImage,
  originalThreadCreatedAt,
  originalThreadUserImage,
}: {
  showStartThreadModal: boolean;
  setShowStartThreadModal: React.Dispatch<SetStateAction<boolean>>;
  originalThreadId: string;
  originalThreadUsername: string;
  originalThreadText: string;
  originalThreadImage: string;
  originalThreadCreatedAt: string;
  originalThreadUserImage: string;
}) => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  const threadImageRef = useRef<HTMLInputElement>(null);

  const [threadImage, setThreadImage] = useState<any>(null);
  const [threadImageUpload, setThreadImageUpload] = useState<any>(null);
  const [threadInput, setThreadInput] = useState<ReplyInput>({
    originalThreadId,
    // @ts-ignore
    userId: session?.user.id,
    text: "",
    image: "",
  });

  // handle thread image and sets the image to the threadImage state
  const handleThreadImage = (image: File[]) => {
    setThreadImage(URL.createObjectURL(image[0]));
    // setThreadInput({
    //   ...threadInput,
    //   image: URL.createObjectURL(e.target.files?.item(0) as Blob),
    // });
    setThreadImageUpload(image[0]);

    return image;
  };

  // handle thread image click and opens the file explorer
  const handleFileClick = () => {
    threadImageRef.current?.click();
  };

  // handle thread creation and dispatches the thread to the redux store
  const handleCreateThread = async () => {
    const data = await StartThread(threadInput);
    if (data?.ok) {
      alert(data?.message);
    }
  };

  return (
    <div className="bg-zinc-900 text-white w-[625px] h-auto flex justify-start items-start flex-col absolute rounded-xl p-4 z-20 m-auto gap-2">
      <h1 className="text-2xl font-bold absolute -translate-y-20 self-center">
        Start Thread
      </h1>
      {/* Original Thread */}
      <section className="flex w-full">
        <section className="rounded-full bg-[--septenary] h-fit w-fit">
          <Image
            src={originalThreadUserImage || "/assets/icons/user.svg"}
            width={75}
            height={75}
            className="p-2 rounded-full max-w-[75px] max-h-[75px] object-cover"
            alt="user"
          />
        </section>
        <section className="flex flex-col w-full">
          <h2 className="font-bold flex items-center justify-between px-2">
            {originalThreadUsername}
          </h2>
          <button
            className="w-12 h-12 absolute top-0 right-0"
            onClick={() => setShowStartThreadModal(!showStartThreadModal)}
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
            value={originalThreadText}
            placeholder="Start a thread..."
            readOnly
            className="bg-transparent appearance-none text-white p-2 outline-none"
          />
          {originalThreadImage ? (
            <Image
              src={originalThreadImage}
              width={100}
              height={100}
              alt="thread-image"
            />
          ) : null}
        </section>
      </section>
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
            onClick={() => setShowStartThreadModal(!showStartThreadModal)}
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
            placeholder="Reply to this thread..."
            onChange={(e) =>
              setThreadInput({ ...threadInput, text: e.target.value })
            }
            className="bg-transparent appearance-none text-white p-2 outline-none"
          />
          {/* <Image
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
          /> */}
          <UploadButton
            endpoint={"media"}
            onBeforeUploadBegin={(file) => handleThreadImage(file)}
            onUploadBegin={(res) => {
              console.log(res);
            }}
            onClientUploadComplete={(res) =>
              setThreadInput((prevState) => {
                return {
                  ...prevState,
                  image: res[0].url,
                };
              })
            }
            config={{
              mode: "manual",
            }}
            appearance={{
              container: {
                width: "fit-content",
                height: "fit-content",
              },
              button: {
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "transparent",
              },
            }}
            content={{
              button(arg) {
                return (
                  <Image
                    src={"/assets/icons/image.svg"}
                    width={20}
                    height={20}
                    alt="image"
                    className="cursor-pointer m-2"
                  />
                );
              },
            }}
            onUploadProgress={(progress) => console.log(progress)}
            onUploadError={(err) => console.log(err)}
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
          onClick={handleCreateThread}
        >
          Post
        </button>
      </section>
    </div>
  );
};

export {
  CreateThreadModal,
  ThreadModalOptions,
  ReplyThreadModal,
  StartThreadModal,
};
