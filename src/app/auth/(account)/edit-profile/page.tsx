"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const EditProfile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const [updateUserInput, setUpdateUserInput] = useState<UpdateUserInput>({
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  if (session?.user) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <form className="flex flex-col max-w-[575px] w-full items-center mx-auto gap-4">
          <section className="flex flex-col">
            <label htmlFor="image">Profile Image</label>
            {session.user.image ? (
              <Image
                src={session.user.image}
                width={85}
                height={85}
                alt="User"
              />
            ) : (
              <Image
                src={"/assets/icons/user.svg"}
                alt="User"
                width={85}
                height={85}
              />
            )}
            <input type="file" name="" id="" />
          </section>
          <input
            type="text"
            name="name"
            placeholder="Enter a name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="username"
            placeholder="Enter a username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter an email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            name="bio"
            placeholder="Enter a bio"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors">
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
