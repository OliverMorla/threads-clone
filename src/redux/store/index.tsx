import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import threadSlice from "../slices/thread-slice";
import userSlice from "../slices/user-slice";

export const store = configureStore({
  middleware: [thunk],
  reducer: {
    threadReducer: threadSlice,
    userReducer: userSlice,
  },
});
