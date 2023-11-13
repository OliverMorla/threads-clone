import { configureStore } from "@reduxjs/toolkit";
import threadSlice from "../slices/thread-slice";

export const store = configureStore({
  reducer: {
    threadReducer: threadSlice,
  },
});
