async function UpdateProfile(
  updateUserInput: UpdateUserInput,
) {
  // let updatedUserInputWithPhoto;

  // if (updateUserInput.image !== "") {
  //   updatedUserInputWithPhoto = await UploadProfilePhoto(
  //     updateUserInput,
  //     localAvatar
  //   );
  // }

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

async function UploadProfilePhoto(
  updateUserInput: UpdateUserInput,
  localAvatar: Blob | File | null | undefined | string
) {
  if (!localAvatar) return;

  const form = new FormData();
  form.append("image", localAvatar);

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_IMGBB_URL!, {
      method: "POST",
      body: form,
    });

    const data = (await res.json()) as ImageUploadResponse;

    if (data.success) {
      const updatedUserInputWithPhoto = {
        ...updateUserInput,
        image: data.data.url,
      };
      return updatedUserInputWithPhoto;
    }

    return null;
  } catch (err) {
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

export {
  UpdateProfile,
  DeleteAccount,
  UpdatePassword,
  UpdateEmail,
  UploadProfilePhoto,
};
