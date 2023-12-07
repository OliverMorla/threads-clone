interface UserThreadProps {
  _id: string;
  username: string;
  userImage?: string;
  image: string;
  userId?: string;
}

interface UserProps {
  _id: string;
  username: string;
  image: string;
  createdAt?: string;
}

interface UserActivityProps {
  _id: string;
  username: string;
  image: string;
  followers: UserFollowProps[];
  following: UserFollowProps[];
  createdAt: string;
}

interface ActivtyCardProps {
  username: string;
  createdAt?: string;
  activty: string;
  userImage: string;
}

interface Thread {
  _id: string;
  text: string;
  likes: UserThreadProps[];
  replies: Thread[];
  image: string;
  childrenThreads: Thread[];
  user: UserThreadProps;
  createdAt: string;
  parentId: string | null;
  isReply: boolean;
}

interface User {
  _id: string;
  username: string;
  name: string | null;
  email: string;
  password: string;
  image: string | null;
  bio: string | null;
  threads: Thread[];
  verified: boolean;
  createdAt: string;
  followers: UserProps[];
  following: UserProps[];
  bookmarks: Thread[];
  website: string;
}

interface UserPayloadProps {
  user: User;
}

interface ThreadCardProps {
  threadId: string;
  threadImage: string;
  text: string;
  replies: Thread[];
  createdAt: string;
  likes: UserThreadProps[];
  userId: string;
  username: string;
  userImage: string;
}

interface ThreadCardWithChildrenProps extends ThreadCardProps {
  childrenThreads: Thread[];
}

interface ThreadModalOptionsProps {
  userId: string;
  threadId: string;
}

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface UpdateUserInput {
  image: string;
  name: string;
  username: string;
  bio: string;
  website: string;
}

interface ThreadInput {
  text: string;
  image: string;
  userId: string;
}

interface ReplyInput extends ThreadInput {
  originalThreadId: string;
}

interface UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

interface UpdateThreadInput {
  text: string;
}

// Api response types
interface ApiResponse<T> {
  status: number;
  message: string;
  ok: boolean;
  data?: T[];
}

interface ImageInfo {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

interface ImageOptions {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: number;
  height: number;
  size: number;
  time: number;
  expiration: number;
  image: ImageInfo;
  thumb: ImageInfo;
  medium: ImageInfo;
  delete_url: string;
}

interface ImageUploadResponse {
  data: ImageOptions;
  success: boolean;
  status: number;
}

interface UserResponse extends ApiResponse<User> {}
interface ThreadResponse extends ApiResponse<Thread> {}
interface ThreadsReponse extends ApiResponse<Thread[]> {}

interface UserInitialProps {
  currentUser: SingleUserInitialProps;
  targetUser: SingleUserInitialProps;
}

interface UserInitialFollowProps {
  _id: {
    _id: string;
    username: string;
    image: string;
  };
  followedDate: string;
}

interface UserFollowProps extends UserInitialFollowProps {}

interface SingleUserInitialProps {
  _id: string;
  username: string;
  name?: string | null;
  email?: string;
  password?: string;
  image?: string | null;
  bio?: string | null;
  threads?: Thread[];
  verified?: boolean;
  createdAt?: string;
  followers: UserInitialFollowProps[];
  following: UserInitialFollowProps[];
  bookmarks?: Thread[];
  website?: string;
}

interface ConversationProps {
  username: string;
  userImage: string;
  lastMessageTimestamp: string;
  lastMessage: string;
  isRead: boolean;
  userId: string;
}

interface ChatProps {
  params: {
    userId: string;
  };
}

interface messages {
  chatId: string;
}
interface SingleChatModalProps {
  userId: string;
}

interface Chats {
  _id: string;
  image: string;
  username: string;
}

interface UserChatProps {
  _id: string;
  image: string;
  username: string;
  name: string;
  verified: boolean;
}


interface SingleChatModalProps {

}

interface Conversations {
  _id: string;
  participants: string[];
  lastMessage: {
    _id: string;
    content: string;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}


interface Messages {
  _id: string;
  conversationId: string;
  sender: string;
  recipient: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MessagesWithUsers {
  _id: string;
  conversationId: string;
  sender: UserMessageProp;
  recipient: UserMessageProp;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserMessageProp {
  _id: string;
  username: string;
  image: string;
}
