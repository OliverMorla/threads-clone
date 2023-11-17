interface Thread {
  _id: string;
  text: string;
  likes: number;
  replies: number;
  children: Thread[] | null;
  user: {
    _id: string;
    username: string;
    image: string;
  };
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
  verified: boolean;
  threads: Thread[];
  createdAt: string;
  updatedAt: string;
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

interface UserResponse extends ApiResponse<User> {}
interface ThreadResponse extends ApiResponse<Thread> {}
interface ThreadsReponse extends ApiResponse<Thread[]> {}
