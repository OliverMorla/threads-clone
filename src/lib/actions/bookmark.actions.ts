async function getBookmarks() {
  try {
    const res = await fetch("/api/auth/bookmarks");

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
  }
}

async function addToBookmark(threadId: string) {
  try {
    const res = await fetch("/api/auth/bookmarks", {
      method: "POST",
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

async function removeFromBookmark(threadId: string) {
  try {
    const res = await fetch("/api/auth/bookmarks", {
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

export { addToBookmark, removeFromBookmark, getBookmarks };
