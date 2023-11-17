"use client";

import { NavigationItems } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreateThreadModal } from "../Modals/Thread";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  if (pathname.startsWith("/auth") && !pathname.includes("edit-profile")) return null;

  return (
    <>
      <header className="w-full flex justify-between max-w-[1230px] mx-auto p-4 items-center">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="max-h-[35px]"
        />
        <nav>
          <ul className="list-none flex flex-row justify-center ">
            {NavigationItems.map((item, index) => {
              if (item.name === "create") {
                return (
                  <li
                    key={index}
                    className="p-4 cursor-pointer hover:opacity-50 hover: transition-all max-sm:hidden"
                    onClick={() => setShowCreateModal(!showCreateModal)}
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
                  <Link href={item.path} key={index}>
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
        <Image
          src={"/assets/icons/menu.svg"}
          alt="Menu"
          width={30}
          height={30}
          className="cursor-pointer hover:opacity-50 transition-all max-h-[35px]"
        />
      </header>
      {showCreateModal ? (
        <motion.section className="w-full h-full absolute flex justify-center items-center">
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
    </>
  );
};

export default Header;
