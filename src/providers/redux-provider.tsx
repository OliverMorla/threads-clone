"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

// the redux provider will provide all reducers and middleware to the app
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
