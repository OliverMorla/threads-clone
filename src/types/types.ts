interface UserThreadProps {
  _id: string;
  username: string;
  image: string;
}

interface UserProps {
  _id: string;
  username: string;
  image: string;
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
