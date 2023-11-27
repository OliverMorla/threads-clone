async function addFollowToUser(userId: string, action: string) {
  try {
    const res = await fetch("/api/auth/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, action }),
    });

    const data = await res.json();

    if (!data.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    return err instanceof Error ? err.message : "Something went wrong";
  }
}

export { addFollowToUser };
