"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

import { UploadButton } from "@/utils/uploadthing";

import { UpdateProfile } from "@/lib/actions/user.actions";

import Notification from "@/components/Modals/Notification";

import { useNotification } from "@/providers/notification-provider";

const EditProfile = () => {
  // get session data from next-auth
  const { data: session } = useSession();

  // get notification state from notification provider
  const { notification, setNotification } = useNotification();

  // set up state for user input to update profile
  const [updateUserInput, setUpdateUserInput] = useState<UpdateUserInput>({
    image: "",
    name: "",
    username: "",
    bio: "",
    website: "",
  });

  // handle current avatar locally before uploading to imgbb
  const handleAvatar = (image: File[]) => {
    // set image to preview
    setUpdateUserInput((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(image[0]),
    }));

    // return image to upload
    return image;
  };

  // update profile with new data and avatar if changed on db
  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const data = await UpdateProfile(updateUserInput);

    if (data.ok) {
      setNotification({
        message: data.message,
        type: "success",
        seconds: 5,
      });
    }
  };

  if (session?.user) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center">
        {notification.message.length > 0 && (
          <Notification
            message={notification.message}
            type={notification.type}
            seconds={notification.seconds}
          />
        )}
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
