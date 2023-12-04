"use client";

import { createContext, useState, useContext } from "react";

interface NotificationContextProps {
  notification: NotificationProps;
  setNotification: React.Dispatch<React.SetStateAction<NotificationProps>>;
}

interface NotificationProps {
  message: string;
  type: string;
  seconds: number;
}

export const NotificationContext = createContext<NotificationContextProps | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context as NotificationContextProps;
};
const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<NotificationProps>({
    message: "",
    type: "",
    seconds: 0,
  });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
