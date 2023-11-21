import { configureStore } from "@reduxjs/toolkit";
import threadSlice from "../slices/thread-slice";
import thunk from "redux-thunk";

export const store = configureStore({
  middleware: [thunk],
  reducer: {
    threadReducer: threadSlice,
  },
});
