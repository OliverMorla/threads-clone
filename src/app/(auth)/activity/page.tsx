"use client";

import { useState, useEffect } from "react";

import { fetchActivity } from "@/lib/actions/activity.actions";

import { ActivityItems } from "@/constants";

import Notification from "@/components/Modals/Notification";
import ActivtyCard from "@/components/Cards/Activity";

const Activity = () => {
  const [activity, setActivity] = useState<UserActivityProps>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchActivity()
      .then((res) => setActivity(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="h-full w-full flex items-center flex-col gap-4">
      {error.length > 0 && (
        <Notification message={error} type="error" seconds={5} />
      )}
      <section className="relative flex gap-2">
        {ActivityItems.map((item, index) => (
          <input
            key={index}
            type="radio"
            name={item.category}
            data-text={item.name}
            className="relative appearance-none w-[100px] h-[35px] border-[--octonary] border-[1px] bg-transparent rounded-lg cursor-pointer checked:bg-white checked:text-black before:content-[attr(data-text)] before:absolute before:flex before:items-center before:justify-center before:w-full before:h-full before:transition-all before:duration-300 before:ease-in-out transition-all"
          />
        ))}
      </section>
      <section className="flex flex-col mt-4 max-w-[575px] w-full gap-4">
        {activity?.following.map((following, index) => (
          <ActivtyCard
            key={index}
            username={following._id.username}
            userImage={following._id.image}
            createdAt={following.followedDate}
            activty={"you started following"}
          />
        ))}
        {activity?.followers.map((follower, index) => (
          <ActivtyCard
            key={index}
            username={follower._id.username}
            userImage={follower._id.image}
            createdAt={follower.followedDate}
            activty={"started following you"}
          />
        ))}
      </section>
    </main>
  );
};

export default Activity;
