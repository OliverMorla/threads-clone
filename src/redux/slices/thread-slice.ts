import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  threads: <Thread[]>[
    {
      _id: "",
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
    createThread: (
      state,
      action: PayloadAction<{
        text: string;
        userId: string;
      }>
    ) => {},
    deleteThread: (state, action: PayloadAction<{ threadId: string }>) => {},
    likeThread: (state, action: PayloadAction<{ threadId: string }>) => {},
  },
});

export const { createThread, deleteThread, likeThread, setThreads } =
  threadSlice.actions;
export default threadSlice.reducer;
