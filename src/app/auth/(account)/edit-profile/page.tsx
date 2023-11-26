"use client";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import Image from "next/image";

import { UpdateProfile } from "@/lib/options/user.options";
import { UploadButton, Uploader } from "@/utils/uploadthing";

const EditProfile = () => {
  const { data: session } = useSession();

  const [avatar, setAvatar] = useState<Blob | File | null | undefined | string>(
    null
  );
  const [updateUserInput, setUpdateUserInput] = useState<UpdateUserInput>({
    image: "",
    name: "",
    username: "",
    bio: "",
    website: "",
  });

  // handle current avatar locally before uploading to imgbb
  const handleAvatar = (file: File[]) => {
    // if (!photo) return;

    setUpdateUserInput((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(file[0]),
    }));

    setAvatar(file[0]);

    return file;
  };

  // update profile with new data and avatar if changed on db
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    uploadRef.current?.click();

    if (updateUserInput.image.includes("https://"))
      await UpdateProfile(updateUserInput);
  };

  const uploadRef = useRef<HTMLButtonElement>(null);

  console.log(updateUserInput);

  if (session?.user) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <form className="flex flex-col max-w-[575px] w-full items-center mx-auto gap-4 p-2">
          <section className="flex flex-col items-center">
            <label htmlFor="image">Profile Image</label>
            <Image
              src={
                updateUserInput.image !== ""
                  ? updateUserInput.image
                  : "/assets/icons/user.svg"
              }
              alt="User"
              width={85}
              height={85}
            />
            <UploadButton
              endpoint={"media"}
              onBeforeUploadBegin={(file) => handleAvatar(file)}
              onUploadBegin={(res) => {
                console.log(res);
              }}
              onClientUploadComplete={(res) =>
                setUpdateUserInput((prevState) => {
                  return {
                    ...prevState,
                    image: res[0].url,
                  };
                })
              }
              config={{
                mode: "manual",
              }}
              onUploadProgress={(progress) => console.log(progress)}
              onUploadError={(err) => console.log(err)}
            />
          </section>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onChange={(e) =>
              setUpdateUserInput({
                ...updateUserInput,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onChange={(e) =>
              setUpdateUserInput({
                ...updateUserInput,
                [e.target.name]: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="website"
            placeholder="Enter a website"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onChange={(e) =>
              setUpdateUserInput({
                ...updateUserInput,
                [e.target.name]: e.target.value,
              })
            }
          />
          <textarea
            name="bio"
            placeholder="Enter a bio"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            onChange={(e) =>
              setUpdateUserInput({
                ...updateUserInput,
                [e.target.name]: e.target.value,
              })
            }
          />
          <button
            className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors"
            onClick={handleUpdateProfile}
          >
            Update/Save Profile
          </button>
        </form>
      </main>
    );
  } else {
    return (
      <main className="h-full w-full flex justify-center items-center">
        <h1>Not signed in, please login or reauthenticate!</h1>
      </main>
    );
  }
};

export default EditProfile;
