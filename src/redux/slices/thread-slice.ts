import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  threads: [
    {
      id: "",
      title: "",
      content: "",
      created_at: "",
      updated_at: "",
    },
  ],
  totalThreads: 0,
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    createThread: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        content: string;
        created_at: string;
        updated_at: string;
      }>
    ) => {},
  },
});

export const { createThread } = threadSlice.actions;
export default threadSlice.reducer;
