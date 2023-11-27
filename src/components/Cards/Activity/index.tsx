import Image from "next/image";

const ActivtyCard = ({
  username,
  createdAt,
  activty,
  userImage,
}: ActivtyCardProps) => {
  return (
    <section className="relative flex items-center gap-2 max-w-[575px] w-full justify-between border-b-[--septenary] border-b-[1px] pb-4">
      <section className="flex gap-2">
        <section>
          <Image
            src={userImage ? userImage : "/assets/icons/user.svg"}
            alt="User"
            width={50}
            height={50}
            className="rounded-full max-w-[45px] max-h-[45px] min-h-[45px] object-cover border-[--octonary] border-[1px]"
          />
        </section>
        <section>
          <section className="flex gap-2">
            <p>{username}</p>
            <p className="opacity-60">
              {new Date(parseInt(createdAt!)).toLocaleTimeString()}
            </p>
          </section>
          <section>
            <p className="opacity-60">{activty}</p>
          </section>
        </section>
      </section>
      {/* <section className="flex gap-2">
        <button className="bg-transparent border-[--octonary] border-[1px] text-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition-all">
          Confirm
        </button>
        <button className="bg-transparent border-[--octonary] border-[1px] text-white rounded-lg px-4 py-1 hover:bg-white hover:text-black transition-all">
          Delete
        </button>
      </section> */}
    </section>
  );
};

export default ActivtyCard;
