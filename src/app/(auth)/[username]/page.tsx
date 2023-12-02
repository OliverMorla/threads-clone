/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, Fragment } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

import { Thread } from "@/components/Cards/Thread";
import Notification from "@/components/Modals/Notification";

import { addFollowToUser } from "@/lib/actions/follow.actions";
import { GetUserSession, FetchUser } from "@/lib/options/user.options";
import {
  followUser,
  unfollowUser,
  assignCurrentUser,
  assignTargetUser,
} from "@/redux/slices/user-slice";

const Profile = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const dispatch = useDispatch();

  const pathname = usePathname();

  // remove %40 from username
  const usernameWithoutAt = username.split("%40")[1];

  // notification state for notification modal
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    seconds: 0,
  });

  const { data: session } = useSession();
  const [user, setUser] = useState<User>();

  // getting current user and target user from redux store to update follow features real-time
  const {
    currentUser,
    targetUser,
  }: {
    currentUser: SingleUserInitialProps;
    targetUser: SingleUserInitialProps;
  } = useSelector((state: any) => state.userReducer);

  const tab = useSearchParams().get("tab");

  // get user session data and stores it in redux store
  const handleGetUserSession = async () => {
    const data = await GetUserSession();

    if (!data.ok) {
      setNotification({
        message: data.message,
        type: "error",
        seconds: 4,
      });
    }

    if (
      data.data.username === usernameWithoutAt ||
      // @ts-ignore
      data.data.username === session?.user.username
    ) {
      dispatch(assignCurrentUser(data.data));
    }
  };

  // get target user data and stores it in redux store and user state
  const handleGetUser = async () => {
    const data = await FetchUser(usernameWithoutAt);

    if (!data.ok) {
      setNotification({
        message: data.message,
        type: "error",
        seconds: 4,
      });
    }

    setUser(data.data);
    dispatch(assignTargetUser(data.data));
  };

  useEffect(() => {
    handleGetUser();
  }, [usernameWithoutAt]);

  useEffect(() => {
    handleGetUserSession();
  }, [session?.user]);

  if (!pathname.includes("@")) return null;

  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;

    if (e.currentTarget.name === "follow") {
      const data = await addFollowToUser(user?._id, "follow");
      if (data.ok) {
        setNotification({
          message: data.message,
          type: "success",
          seconds: 3,
        });

        dispatch(
          followUser({
            _id: user._id,
            username: user.username,
            image: user.image!,
          })
        );
      } else {
        setNotification({
          message: data.message,
          type: "error",
          seconds: 3,
        });
      }
    } else if (e.currentTarget.name === "unfollow") {
      const data = await addFollowToUser(user?._id, "unfollow");
      if (data.ok) {
        setNotification({
          message: data.message,
          type: "success",
          seconds: 3,
        });

        dispatch(
          unfollowUser({
            _id: user._id,
            username: user.username,
            image: user.image!,
          })
        );
      } else {
        setNotification({
          message: data.message,
          type: "error",
          seconds: 3,
        });
      }
    }
  };

  // check if current user is being followed by target user
  const doesFollowExist = targetUser.followers.some(
    // @ts-ignore
    (follower) => follower._id._id === session?.user.id
  );

  // @ts-ignore // check if current user matches the username in the url
  const doesCurrentUserMatch = usernameWithoutAt === session?.user.username;
  // @ts-ignore // check if current user matches the username in the url
  const doesCurrentUserDoesNotMatch = usernameWithoutAt !== session?.user.username;

  return (
    <main className="h-auto w-full flex justify-start flex-col items-center max-w-[500px] mx-auto">
      {notification.seconds > 0 && (
        <Notification
          message={notification.message}
          type={notification.type}
          seconds={notification.seconds}
        />
      )}
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
        <section>{targetUser?.followers.length} followers </section>
        <span>·</span>
        <section>{targetUser?.following.length} following </section>
        {user?.website && (
          <section className="flex gap-2">
            <span>·</span>
            {user?.website && user.website}
          </section>
        )}
      </section>

      {doesCurrentUserDoesNotMatch &&
        (doesFollowExist ? (
          <button
            className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full"
            name="unfollow"
            onClick={handleFollow}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full"
            name="follow"
            onClick={handleFollow}
          >
            Follow
          </button>
        ))}

      {doesCurrentUserMatch && (
        <Link href={"/auth/edit-profile"} className="w-full">
          <button className="bg-[--septenary] p-2 rounded-md mt-4 hover:bg-[--primary-hover] transition-colors w-full">
            Edit Profile
          </button>
        </Link>
      )}

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
        <section className="flex flex-col h-full">
          {user ? (
            // @ts-ignore
            user[tab?.toLowerCase()]?.map((thread: Thread) => (
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
          )}
        </section>
      </section>
    </main>
  );
};

export default Profile;
