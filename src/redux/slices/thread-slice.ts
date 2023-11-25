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
      });
    },
    deleteThread: (state, action: PayloadAction<{ threadId: string }>) => {
      state.threads = state.threads.filter(
        (thread) => thread._id !== action.payload.threadId
      );
    },
    likeThread: (
      state,
      action: PayloadAction<{
        threadId: string;
        userImage: string;
        username: string;
      }>
    ) => {
      state.threads.map((thread) => {
        if (thread._id === action.payload.threadId) {
          thread.likes.push({
            _id: "user",
            image: action.payload.userImage,
            username: action.payload.username,
          });
        } else {
          return null;
        }
      });
    },
  },
});

export const { addThread, deleteThread, likeThread, setThreads } =
  threadSlice.actions;
export default threadSlice.reducer;
