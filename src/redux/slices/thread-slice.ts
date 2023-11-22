import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  threads: <Thread[]>[
    {
      _id: "initialThread",
      text: "",
      likes: [{ _id: "", image: "", username: "" }],
      replies: [{ _id: "", image: "", username: "" }],
      childrenThreads: null,
      user: {
        _id: "",
        image: "",
        username: "",
      },
      createdAt: "",
      updatedAt: "",
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
    addThread: (
      state,
      action: PayloadAction<{
        text: string;
        image: string;
        user: {
          username: string;
          image: string;
        };
      }>
    ) => {
      const {
        text,
        image,
        user: { username, image: userImage },
      } = action.payload;
      state.threads.unshift({
        _id: "",
        image: "",
        text: text,
        likes: [{ _id: "", image: "", username: "" }],
        replies: [{ _id: "", image: "", username: "" }],
        childrenThreads: null,
        user: {
          _id: "",
          image: userImage,
          username: username,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    },
    deleteThread: (state, action: PayloadAction<{ threadId: string }>) => {
      state.threads = state.threads.filter(
        (thread) => thread._id !== action.payload.threadId
      );
    },
    likeThread: (state, action: PayloadAction<{ threadId: string }>) => {},
  },
});

export const { addThread, deleteThread, likeThread, setThreads } =
  threadSlice.actions;
export default threadSlice.reducer;
