async function GetUserSession() {
  try {
    const res = await fetch("/api/auth/user");
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "failed get user session");
  }
}

async function FetchUser(username: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  };

  try {
    if (!username) throw new Error("Missing required fields");

    const res = await fetch(`/api/auth/user`, options);
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    return err instanceof Error ? err.message : "failed to get user";
  }
}

async function UpdateProfile(updateUserInput: UpdateUserInput) {
  try {
    const res = await fetch("/api/auth/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUserInput),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.message);
    return data;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

async function DeleteAccount() {}

async function UpdatePassword() {}

async function UpdateEmail() {}

export {
  UpdateProfile,
  DeleteAccount,
  UpdatePassword,
  UpdateEmail,
  GetUserSession,
  FetchUser,
};
