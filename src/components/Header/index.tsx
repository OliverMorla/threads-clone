"use client";

import { NavigationItems } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  console.log(pathname);

  if (pathname.startsWith("/auth")) return null;

  return (
    <header className="w-full flex justify-between max-w-[1230px] mx-auto p-4 items-center">
      <Image src="/assets/icons/logo.svg" alt="Logo" width={35} height={35} className="max-h-[35px]"/>
      <nav>
        <ul className="list-none flex flex-row justify-center ">
          {NavigationItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all max-sm:hidden">
                <Image
                  src={`/assets/icons/${item.name}.svg`}
                  alt="Home"
                  width={35}
                  height={35}
                  className="min-w-[20px] min-h-[20px]"
                />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src={"/assets/icons/menu.svg"}
        alt="Menu"
        width={35}
        height={35}
        className="cursor-pointer hover:opacity-50 transition-all max-h-[35px]"
      />
    </header>
  );
};

export default Header;
