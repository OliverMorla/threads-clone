import { FooterItems } from "@/constants";

const Footer = () => {
  return (
    <footer>
      <ul className="list-none flex gap-2 items-center justify-center max-w-[1230px] mx-auto text-[--quinary] opacity-40 text-xs p-4">
        {FooterItems.map((item, index) => (
          <li key={index} className="cursor-pointer hover:opacity-50 transition-opacity">
            {item.name}
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
