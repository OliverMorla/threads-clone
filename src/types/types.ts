interface Thread {
  _id: string;
  text: string;
  likes: User[];
  replies: User[];
  childrenThreads: Thread[] | null;
  user: User;
  createdAt: string;
  updatedAt: string;
}

interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  image: string;
  bio: string;
  threads: Thread[];
  verified: boolean;
  createdAt: string;
  followers: User[];
  following: User[];
  bookmarks: Thread[];
}

interface ThreadCardProps {
  username: string;
  text: string;
  createdAt: string;
  likes: number;
  replies: number;
  childrenThreads: Thread[] | null;
  userId: string;
  threadId: string;
  userImage: string;
}

interface ThreadModalOptionsProps {
  userId: string;
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
  email: string;
  bio: string;
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
