// fetch threads from the server
async function fetchThreads(limit: string) {
  const res = await fetch("/api/threads");
}

// upload thread image to imgbb and return the url
// async function UploadThreadImage(
//   threadInput: ThreadInput,
//   threadImage: Blob | File | null | undefined | string
// ) {
//   if (!threadImage) return;

//   const form = new FormData();
//   form.append("image", threadImage);

//   try {
//     const res = await fetch(process.env.NEXT_PUBLIC_IMGBB_URL!, {
//       method: "POST",
//       body: form,
//     });

//     const data = (await res.json()) as ImageUploadResponse;

//     if (data.success) {
//       const updatedThreadInputWithImage = {
//         ...threadInput,
//         image: data.data.url,
//       };
//       return updatedThreadInputWithImage;
//     }

//     return null;
//   } catch (err) {
//     alert(err instanceof Error ? err.message : "Unknown error");
//   }
// }

async function DeleteThread(threadId: string) {}

async function EditThread(threadId: string, text: string) {}

async function CreateThread(
  threadInput: ThreadInput,
  // threadImage: Blob | File | null | undefined | string
) {
  // let updatedThreadInputWithImage;

  // if (threadImage) {
  //   updatedThreadInputWithImage = await UploadThreadImage(
  //     threadInput,
  //     threadImage
  //   );
  // }

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
    alert(err instanceof Error ? err.message : "Unknown error");
  }
}

async function ReplyToThread(
  threadInput: ThreadInput,
  threadImage: Blob | File | null | undefined | string
) {
  // let updatedThreadInputWithImage;

  // if (threadImage) {
  //   updatedThreadInputWithImage = await UploadThreadImage(
  //     threadInput,
  //     threadImage
  //   );
  // }

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

async function StartThread(
  threadInput: ReplyInput,
  threadImage: Blob | File | null | undefined | string
) {
  // let updatedThreadInputWithImage;

  // if (threadImage) {
  //   updatedThreadInputWithImage = await UploadThreadImage(
  //     threadInput,
  //     threadImage
  //   );
  // }

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
  // UploadThreadImage,
  DeleteThread,
  EditThread,
  CreateThread,
  ReplyToThread,
  StartThread,
  LikeThread,
};
