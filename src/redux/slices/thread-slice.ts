import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  threads: <Thread[]>[
    {
      _id: "initialThread",
      text: "initialThread",
      likes: [],
      replies: [],
      user: {
        _id: "initialThread",
        image: "initialThread",
        username: "initialThread",
      },
      createdAt: "initialThread",
      image: "initialThread",
      isReply: false,
      parentId: "initialThread",
      childrenThreads: [],
    },
  ],
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setThreads: (state, action) => {
      state.threads = action.payload;
    },
    addThread: (state, action: PayloadAction<Thread>) => {
      const {
        text,
        image,
        user: { _id: userId, username, image: userImage },
      } = action.payload;
      state.threads.unshift({
        _id: "newThread",
        image: image,
        text: text,
        likes: [],
        replies: [],
        user: {
          _id: userId,
          image: userImage,
          username: username,
        },
        createdAt: new Date().toISOString(),
        childrenThreads: [],
        isReply: false,
        parentId: "newThread",
      });
    },
    deleteThread: (state, action: PayloadAction<{ threadId: string }>) => {
      state.threads = state.threads.filter(
        (thread) => thread._id !== action.payload.threadId
      );
    },
    addThreadLike: (
      state,
      action: PayloadAction<{
        threadId: string;
        userId: string;
        userImage: string;
        username: string;
      }>
    ) => {
      state.threads.map((thread) => {
        if (thread.likes.find((like) => like._id === action.payload.userId)) {
          thread.likes = thread.likes.filter(
            (like) => like._id !== action.payload.userId
          );
          state.threads = [...state.threads, thread];
        } else {
          thread.likes.push({
            _id: action.payload.userId,
            image: action.payload.userImage,
            username: action.payload.username,
          });
        }
      });
    },
  },
});

export const { addThread, deleteThread, addThreadLike, setThreads } =
  threadSlice.actions;
export default threadSlice.reducer;
