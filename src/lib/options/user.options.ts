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
    return alert(data.message);
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

async function DeleteAccount() {}

async function UpdatePassword() {}

async function UpdateEmail() {}

export { UpdateProfile, DeleteAccount, UpdatePassword, UpdateEmail };
