import Link from "next/link";
import Image from "next/image";

const SingleChatModal = ({
  userId,
  username,
  userImage,
  messages,
}: SingleChatModalProps) => {
  return (
    <section className="flex flex-col w-full h-full">
      <section className="flex w-full border-b-[1px] border-[--octonary] items-center p-2">
        <section className="rounded-full bg-[--septenary] h-fit w-fit border-[--octonary] border-[1px] ml-2">
          <Image
            src={"/assets/icons/user.svg"}
            width={55}
            height={55}
            alt="user-icon"
            className="max-w-[55px] max-h-[55px] h-[55px] w-[55px] rounded-full object-cover"
          />
        </section>
        <section className="flex w-full justify-between mx-2">
          <p className="font-bold">{username}</p>
          <Image
            src={"/assets/icons/info.svg"}
            width={35}
            height={35}
            alt="info"
          />
        </section>
      </section>
      <section className="flex flex-col flex-grow h-full">
        messages
      </section>
      <section className="flex justify-center">
        <input
          type="text"
          name="message"
          placeholder="Message..."
          className="bg-transparent appearance-none border w-[95%] p-2 border-[--octonary] border-[1px] outline-none"
        />
      </section>
    </section>
  );
};

export default SingleChatModal;
