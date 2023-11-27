/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { Thread } from "@/components/Cards/Thread";
import { addFollowToUser } from "@/lib/actions/follow.actions";

const Profile = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const [user, setUser] = useState<User>();
  const [tabData, setTabData] = useState(null);
  const { data: session } = useSession();

  const pathname = usePathname();

  const tab = useSearchParams().get("tab");

  const getData = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const { data, ok, status, message } = await res.json();
      console.log(data.followers, ok, status, message);
      if (ok) {
        setUser(data);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      alert(err instanceof Error && err.message);
    }
  };

  const postData = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.split("%40")[1], tab }),
      });
      const { data, ok, status, message } = await res.json();
      console.log(data, ok, status, message);

      if (ok) {
        setTabData(data);
      } else {
        throw new Error(message);
      }
    } catch (err) {
      alert(err instanceof Error && err.message);
    }
  };

  useEffect(() => {
    getData(`/api/auth/user/${username.split("%40")[1]}`);

    return () => {
      setUser(undefined);
    };
  }, [username]);

  useEffect(() => {
    console.log(pathname);
    if (tab) {
      postData(`/api/auth/user/${username.split("%40")[1]}`);
    }
  }, [tab]);

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;

    if (e.currentTarget.name === "follow") {
      const data = await addFollowToUser(user?._id, "follow");
      if (data.ok) {
        alert(data.message);
      } else {
        alert(data);
      }
    } else if (e.currentTarget.name === "unfollow") {
      const data = await addFollowToUser(user?._id, "unfollow");
      if (data.ok) {
        alert(data.message);
      } else {
        alert(data);
      }
    }
  };

  return (
    <main className="h-full w-full flex justify-start flex-col items-center max-w-[500px] mx-auto">
      <section className="flex justify-between w-full items-center">
        <section>
          <h2 className="font-bold">
            {user?.name ? user.name : "No name exist"}
          </h2>
          <h3 className="text-sm flex gap-2 items-center">
            {user?.username}{" "}
            {user?.verified ? (
              <Image
                src="/assets/icons/verified-filled.svg"
                alt="Verified"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/assets/icons/verified-outline.svg"
                alt="Verified"
                width={20}
                height={20}
                className="opacity-20 cursor-pointer"
                title="Not Verified"
              />
            )}
            <p className="bg-[--septenary] text-xs rounded-md p-1">
              threads.net
            </p>
          </h3>
        </section>
        <section className="flex flex-col items-center">
          <section className="rounded-full bg-[--septenary] h-fit w-fit border-[--octonary] border-[1px]">
            <Image
              src={user?.image ? user?.image : "/assets/icons/user.svg"}
              className="max-w-[85px] max-h-[85px] h-[85px] w-[85px] rounded-full object-cover"
              alt="User"
              width={85}
              height={85}
            />
          </section>
        </section>
      </section>
      <section className="p-4 opacity-60">
        <p>{user?.bio ? user.bio : "No bio exist"}</p>
      </section>

      <section className="flex gap-2 text-xs opacity-60 justify-start w-full">
        <section>{user?.followers.length} followers </section>
        <span>·</span>
        <section>{user?.following.length} following </section>
        {user?.website && (
          <section className="flex gap-2">
            <span>·</span>
            {user?.website}
          </section>
        )}
      </section>

      {
        // @ts-ignore
        session?.user.username !== username.split("%40")[1] &&
          !user?.followers?.find(
            // @ts-ignore
            (follower: any) => follower === session?.user.id
          ) && (
            <button
              className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full"
              name="follow"
              onClick={handleFollow}
            >
              Follow
            </button>
          )
      }

      {
        // @ts-ignore
        session?.user.username !== username.split("%40")[1] &&
          user?.followers?.find(
            // @ts-ignore
            (follower) => follower === session?.user.id
          ) && (
            <button
              className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full"
              name="unfollow"
              onClick={handleFollow}
            >
              Unfollow
            </button>
          )
      }

      {
        // @ts-ignore
        session?.user.username === username.split("%40")[1] && (
          <Link href={"/auth/edit-profile"} className="w-full">
            <button className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full">
              Edit Profile
            </button>
          </Link>
        )
      }
      <section className="flex flex-col w-full">
        <section className="flex w-full">
          <section
            className="border-b-[1px] border-white px-10 py-3 flex-1"
            style={{
              opacity: tab === "Threads" ? 1 : 0.6,
            }}
          >
            <Link
              href={{
                pathname: `/@${username.split("%40")[1]}`,
                query: { tab: "Threads" },
              }}
            >
              <h1>Threads</h1>
            </Link>
          </section>
          <section
            className="border-b-[1px] border-white px-10 py-3 flex-1"
            style={{
              opacity: tab === "Replies" ? 1 : 0.6,
            }}
          >
            <Link
              href={{
                pathname: `/@${username.split("%40")[1]}`,
                query: { tab: "Replies" },
              }}
            >
              <h1>Replies</h1>
            </Link>
          </section>
          <section
            className="border-b-[1px] border-white px-10 py-3 flex-1"
            style={{
              opacity: tab === "Likes" ? 1 : 0.6,
            }}
          >
            <Link
              href={{
                pathname: `/@${username.split("%40")[1]}`,
                query: { tab: "Likes" },
              }}
            >
              <h1>Likes</h1>
            </Link>
          </section>
        </section>
        <section>
          {
            // @ts-ignore
            tabData && tabData[tab?.toLowerCase()].length > 0 ? (
              // @ts-ignore
              tabData[tab?.toLowerCase()]?.map((thread: Thread) => (
                <Fragment key={thread?._id}>
                  <Thread
                    key={thread?._id}
                    text={thread?.text}
                    threadId={thread?._id}
                    username={thread?.user?.username}
                    createdAt={thread?.createdAt}
                    likes={thread?.likes}
                    replies={thread?.replies}
                    threadImage={thread?.image}
                    userId={thread?.user?._id}
                    userImage={thread?.user?.image}
                  />
                </Fragment>
              ))
            ) : (
              <h1 className="text-center p-2">No Threads Available</h1>
            )
          }
        </section>
      </section>
    </main>
  );
};

export default Profile;
