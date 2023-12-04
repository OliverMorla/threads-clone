"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { CreateThreadModal } from "../Modals/Thread";

import { NavigationLinks } from "@/constants";
import { useSocket } from "@/providers/socket-provider";

const Header = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);

  const { isConnected } = useSocket();

  if (pathname.startsWith("/auth") && !pathname.includes("edit-profile"))
    return null;

  return (
    <>
      <header className="w-full flex justify-between max-w-[1230px] mx-auto p-4 items-center">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo.svg"
            alt="Logo"
            width={30}
            height={30}
            className="max-h-[35px] max-w-[35px] cursor-pointer hover:opacity-50 transition-all"
          />
        </Link>
        <nav>
          <ul className="list-none flex flex-row justify-center ">
            {NavigationLinks.map((item, index) => {
              if (item.name === "create") {
                return (
                  <li
                    key={index}
                    className="p-4 cursor-pointer hover:opacity-50 hover: transition-all max-sm:hidden"
                    onClick={() => {
                      session?.user
                        ? setShowCreateModal(!showCreateModal)
                        : window.location.replace("/auth/login");
                    }}
                  >
                    <Image
                      src={`/assets/icons/${item.name}.svg`}
                      alt="Home"
                      width={30}
                      height={30}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  </li>
                );
              } else if (item.name === "user") {
                return (
                  <Link
                    href={
                      session?.user
                        ? // @ts-ignore
                          `/@${session.user.username}`
                        : `/auth/login`
                    }
                    key={index}
                  >
                    <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all max-sm:hidden">
                      <Image
                        src={`/assets/icons/${item.name}.svg`}
                        alt="Home"
                        width={30}
                        height={30}
                        className="min-w-[20px] min-h-[20px]"
                      />
                    </li>
                  </Link>
                );
              } else {
                return (
                  <Link
                    href={session?.user ? item.path : "/auth/login"}
                    key={index}
                  >
                    <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all max-sm:hidden">
                      <Image
                        src={`/assets/icons/${item.name}.svg`}
                        alt="Home"
                        width={30}
                        height={30}
                        className="min-w-[20px] min-h-[20px]"
                      />
                    </li>
                  </Link>
                );
              }
            })}
          </ul>
        </nav>
        <section className="flex items-center gap-2">
          <section className="text-xs border-slate-300 border-[1px] p-1">
            <p>Live Updates</p>
            <div className="text-center">
              {isConnected ? (
                <span className="text-green-500">●</span>
              ) : (
                <span className="text-red-500">●</span>
              )}
            </div>
          </section>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="Menu"
            width={30}
            height={30}
            className="cursor-pointer hover:opacity-50 transition-all max-h-[35px]"
            onClick={() => setShowMenuModal(!showMenuModal)}
          />
        </section>
      </header>
      {showCreateModal ? (
        <motion.section className="w-full h-full absolute flex justify-center items-center z-20">
          <motion.div
            className="w-full h-full bg-black opacity-50 absolute cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(!showCreateModal)}
          />
          <CreateThreadModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
          />
        </motion.section>
      ) : null}
      {showMenuModal ? (
        <motion.section className="w-full h-full absolute flex justify-center items-center ">
          <motion.div
            className="w-full h-full bg-black opacity-50 absolute cursor-pointer z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMenuModal(!showMenuModal)}
          />
          <HeaderOptions />
        </motion.section>
      ) : null}
    </>
  );
};

const HeaderOptions = () => {
  const { data: session } = useSession();

  return (
    <section className="flex flex-col justify-center items-start bg-zinc-900 z-10">
      <section className="flex flex-col justify-center items-center gap-4 w-full p-4 cursor-pointer">
        {session?.user ? (
          <>
            <Image
              src={session.user.image || "/assets/icons/user.svg"}
              alt="UserImage"
              width={30}
              height={30}
              className="max-w-[35px] max-h-[35px] object-cover border-[--octonary] border-[1px] rounded-full"
            />
            <h4 className="font-bold">
              {
                // @ts-ignore
                session.user.username ? `@${session.user.username}` : null
              }
            </h4>
          </>
        ) : null}
      </section>
      <section className="flex flex-row justify-center items-center gap-4 hover:bg-zinc-950 transition-colors p-4">
        <Image
          src={"/assets/icons/settings.svg"}
          alt="Settings"
          width={30}
          height={30}
        />
        <h1 className="text-white font-bold text-lg">Settings</h1>
      </section>
      {session?.user ? (
        <section
          className="flex flex-row justify-center items-center gap-4 hover:bg-zinc-950 p-4 w-full cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
              redirect: true,
            })
          }
        >
          <Image
            src={"/assets/icons/logout.svg"}
            alt="Logout"
            width={30}
            height={30}
          />
          <h1 className="text-white font-bold text-lg">Logout</h1>
        </section>
      ) : (
        <Link href={"/auth/login"} className="w-full self-start">
          <section className="flex flex-row justify-center items-center gap-4 hover:bg-zinc-950 p-4">
            <Image
              src={"/assets/icons/login.svg"}
              alt="Login"
              width={30}
              height={30}
            />
            <h1 className="text-white font-bold text-lg">Login</h1>
          </section>
        </Link>
      )}
    </section>
  );
};

const HeaderSideBar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);

  const { isConnected } = useSocket();

  if (pathname.startsWith("/auth") && !pathname.includes("edit-profile"))
    return null;

  return (
    <aside>
      <nav className="sm:hidden">
        <ul className="list-none flex flex-col justify-center">
          {NavigationLinks.map((item, index) => {
            if (item.name === "create") {
              return (
                <li
                  key={index}
                  className="p-4 cursor-pointer hover:opacity-50 hover: transition-all"
                  onClick={() => {
                    session?.user
                      ? setShowCreateModal(!showCreateModal)
                      : window.location.replace("/auth/login");
                  }}
                >
                  <Image
                    src={`/assets/icons/${item.name}.svg`}
                    alt="Home"
                    width={30}
                    height={30}
                    className="min-w-[20px] min-h-[20px]"
                  />
                </li>
              );
            } else if (item.name === "user") {
              return (
                <Link
                  href={
                    session?.user
                      ? // @ts-ignore
                        `/@${session.user.username}`
                      : `/auth/login`
                  }
                  key={index}
                >
                  <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all">
                    <Image
                      src={`/assets/icons/${item.name}.svg`}
                      alt="Home"
                      width={30}
                      height={30}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  </li>
                </Link>
              );
            } else {
              return (
                <Link
                  href={session?.user ? item.path : "/auth/login"}
                  key={index}
                >
                  <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all">
                    <Image
                      src={`/assets/icons/${item.name}.svg`}
                      alt="Home"
                      width={30}
                      height={30}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
};

export { Header, HeaderSideBar };
