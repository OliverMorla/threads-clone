"use client";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CreateThread = () => {
  const [markdown, setMarkdown] = useState("");
  const { data: session, status } = useSession();

  const [threadInput, setThreadInput] = useState({
    text: "",
    // @ts-ignore
    userId: session?.user.id,
  });

  console.log(threadInput);

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

      console.log(data);

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
    <div className="bg-zinc-900 text-white w-[500px] h-[300px] opacity-80 flex justify-center items-center flex-col">
      <h1>Create Thread</h1>
      <MarkdownEditor
        value={markdown}
        height="200px"
        style={{
          fontSize: 16,
        }}
        onChange={(value, viewUpdate) =>
          setThreadInput({ ...threadInput, text: value })
        }
      />
      <button
        className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={createThread}
      >
        Create Thread
      </button>
    </div>
  );
};

export default CreateThread;
