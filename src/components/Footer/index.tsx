"use client";
import { FooterItems } from "@/constants";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Footer = () => {
  const { data: session } = useSession();
  return (
    <footer>
      <ul className="list-none flex gap-2 items-center justify-center max-w-[1230px] mx-auto text-[--quinary] opacity-40 text-xs p-4 max-sm:flex-col">
        {session?.user && (
          <Image
            src={"/assets/icons/log-out.svg"}
            width={25}
            height={25}
            alt="Log Out"
            className="cursor-pointer hover:opacity-50 transition-opacity absolute left-0 m-4"
            onClick={() =>
              signOut({
                callbackUrl: "/auth/login",
                redirect: true,
              })
            }
          />
        )}
        {FooterItems.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:opacity-50 transition-opacity"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
