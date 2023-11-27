import Image from "next/image";

interface ActivtyCardProps {
  username: string;
  createdAt: string;
  activty: string;
}

const ActivtyCard = ({ username, createdAt, activty }: ActivtyCardProps) => {
  return (
    <section className="relative flex items-center gap-2 max-w-[575px] w-full justify-between border-b-[--septenary] border-b-[1px] pb-4">
      <section className="flex gap-2">
        <section>
          <Image
            src={"/assets/icons/user.svg"}
            alt="User"
            width={50}
            height={50}
            className="rounded-full border-[--octonary] border-[1px] "
          />
        </section>
        <section>
          <section className="flex">
            <p>{username}</p>
            <p className="opacity-60">{createdAt}</p>
          </section>
          <section>
            <p className="opacity-60">{activty}</p>
          </section>
        </section>
      </section>
      <section className="flex gap-2">
        <button className="bg-transparent border-[--octonary] border-[1px] text-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition-all">
          Confirm
        </button>
        <button className="bg-transparent border-[--octonary] border-[1px] text-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition-all">
          Delete
        </button>
      </section>
    </section>
  );
};

export default ActivtyCard;
