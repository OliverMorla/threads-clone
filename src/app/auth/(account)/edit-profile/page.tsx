"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import { UpdateProfile } from "@/lib/actions/user.options";

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
  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.item(0);

    if (!photo) return;

    setUpdateUserInput((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(photo),
    }));

    setAvatar(e.target.files?.item(0));
  };

  // update profile with new data and avatar if changed on db
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await UpdateProfile(updateUserInput, avatar);
  };

  if (session?.user) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <form className="flex flex-col max-w-[575px] w-full items-center mx-auto gap-4 p-2">
          <section className="flex flex-col">
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

            <input
              type="file"
              name="image"
              onChange={handleAvatar}
              accept="image/*"
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
