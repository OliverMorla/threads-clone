// get messages from a chat conversation using recipientId/coverstationId
async function getMessages(conversationId: string) {
  try {
    const res = await fetch(`/api/auth/chats/${conversationId}`);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error && err.message;
  }
}

// send a message
async function sendMessage(content: string, recipientId: string) {
  try {
    const res = await fetch(`/api/auth/chats/${recipientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, recipientId }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error && err.message;
  }
}

export { getMessages, sendMessage };
