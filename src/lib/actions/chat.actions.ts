// get all active chats
async function getChats() {
  try {
    const res = await fetch("/api/auth/chats");

    const data = await res.json();

    if (!data.ok) throw new Error("Failed to get chats");

    return data;
  } catch (err) {
    if (err instanceof Error) return err.message;
  }
}

// get a single chat
async function getChat(chatId: string) {
  try {
    const res = await fetch(`/api/auth/chats/${chatId}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error && err.message;
  }
}

// create a new chat
async function createChat(userId: string) {
  try {
    const res = await fetch(`/api/auth/chats/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error && err.message;
  }
}

// delete a chat
async function deleteChat(chatId: string) {
  try {
    const res = await fetch(`/api/auth/chats/${chatId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error && err.message;
  }
}

export { getChats, getChat, createChat, deleteChat };
