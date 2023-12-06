"use client";

import { createContext, useEffect, useContext } from "react";
import { useState } from "react";
import { socket } from "@/lib/socket";

interface SocketContextProps {
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextProps | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Real-time updates enabled!");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Real-time updates disabled!");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
