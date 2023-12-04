// fetch threads from the server
async function fetchThreads(limit: string) {
  const res = await fetch("/api/threads");
  const data = await res.json();
  return data;
}

// delete thread from the server
async function DeleteThread(threadId: string) {
  try {
    const res = await fetch("/api/auth/threads", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId }),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

// edit thread from the server
async function EditThread(threadId: string, text: string) {}

// create thread from the server
async function CreateThread(threadInput: ThreadInput) {
  try {
    const res = await fetch("/api/auth/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadInput),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "failed to create thread");
  }
}

// reply to thread from the server
async function ReplyToThread(threadInput: ThreadInput) {
  try {
    const res = await fetch("/api/auth/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadInput),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

// start thread from the server
async function StartThread(threadInput: ReplyInput) {
  try {
    const res = await fetch(
      `/api/auth/threads/${threadInput.originalThreadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(threadInput),
      }
    );

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

// like thread from the server
async function LikeThread(threadId: string) {
  try {
    const res = await fetch(`/api/auth/threads/${threadId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ threadId }),
    });

    const data = await res.json();

    console.log(data);

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : null);
  }
}

export {
  DeleteThread,
  EditThread,
  CreateThread,
  ReplyToThread,
  StartThread,
  LikeThread,
};
