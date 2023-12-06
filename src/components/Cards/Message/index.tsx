import Image from "next/image";

interface MessageProp {
  content: string;
  userImage: string;
  username: string;
  createdAt: string;
}

const SenderMessage = ({
  content,
  userImage,
  username,
  createdAt,
}: MessageProp) => {
  return (
    <div className="self-end flex items-center gap-2">
      <div>
        <Image
          src={userImage}
          width={25}
          height={25}
          alt="user-image"
          className="rounded-full max-w-[25px] max-h-[25px] object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col bg-blue-500 rounded-xl p-1">
          <h4 className="font-bold">{username}</h4>
          <p className="text-sm">{content}</p>
        </div>
        <p className="opacity-20">{new Date(createdAt).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

const RecipientMessage = ({
  content,
  userImage,
  username,
  createdAt,
}: MessageProp) => {
  return (
    <div className="self-start flex items-center gap-2">
      <div>
        <Image
          src={userImage}
          width={25}
          height={25}
          alt="user-image"
          className="rounded-full max-w-[25px] max-h-[25px] object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col bg-slate-500 rounded-xl p-1">
          <h4 className="font-bold">{username}</h4>
          <p className="text-sm">{content}</p>
        </div>
        <p className="opacity-20">{new Date(createdAt).toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export { SenderMessage, RecipientMessage };
