import Image from "next/image";
import Link from "next/link";
import { NavigationItems } from "@/props";

const Header = () => {
  return (
    <header className="w-full flex justify-between">
      <Image src="/assets/icons/logo.svg" alt="Logo" width={50} height={50} />
      <nav>
        <ul className="list-none flex flex-row justify-center">
          {NavigationItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <li className="p-4 cursor-pointer hover:opacity-50 hover: transition-all">
                <Image
                  src={`/assets/icons/${item.name}.svg`}
                  alt="Home"
                  width={50}
                  height={50}
                />
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src={"/assets/icons/menu.svg"}
        alt="Menu"
        width={50}
        height={50}
        className="cursor-pointer hover:opacity-50 transition-all"
      />
    </header>
  );
};

export default Header;
