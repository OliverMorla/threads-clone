"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const IMAGE_UPLOAD_URL = process.env.NEXT_PUBLIC_IMGBB_URL;

  const { data: session } = useSession();

  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState<any>(null);
  const [updateUserInput, setUpdateUserInput] = useState<UpdateUserInput>({
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const photo = e.target.files?.item(0);

    if (!photo) return;

    setUpdateUserInput((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(photo),
    }));

    setAvatar(e.target.files?.item(0));
  };

  const handleUploadAvatar = async () => {
    const form = new FormData();
    form.append("image", avatar);

    try {
      const res = await fetch(IMAGE_UPLOAD_URL as string, {
        method: "POST",
        body: form,
      });

      const data = (await res.json()) as ImageUploadResponse;

      if (data.success) {
        const updatedUserInput = {
          ...updateUserInput,
          image: data.data.url,
        };
        setUpdateUserInput(updatedUserInput);

        return updatedUserInput;
      }

      return null;
    } catch (err) {
      console.log(err);

      return null;
    }
  };

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const updatedUserInput = await handleUploadAvatar();

    if (updatedUserInput) {
      try {
        const res = await fetch("/api/auth/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserInput),
        });
        const data = await res.json();
        console.log(updateUserInput);
        console.log(data);
        if (!data.ok) throw new Error(data.message);
        alert(data.message);
      } catch (err) {
        alert(err instanceof Error ? err.message : "Unknown error");
      }
    }
  };

  console.log(updateUserInput);

  if (session?.user) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <form className="flex flex-col max-w-[575px] w-full items-center mx-auto gap-4">
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
            name="email"
            placeholder="Enter an email"
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
