"use client";

import { NavigationItems } from "@/constants";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateThread from "../Modal/CreateThread";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  if (pathname.startsWith("/auth")) return null;

  return (
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
                    // @ts-ignore
                    session?.user ? `/@${session.user.username}` : `/auth/login`
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
      {showCreateModal ? (
        <section className="absolute top-[30%] left-[30%]">
          <CreateThread />
        </section>
      ) : null}
    </header>
  );
};

export default Header;
