"use client";

import { createContext, useEffect } from "react";
import { useState } from "react";
import { socket } from "@/lib/socket";

interface SocketContextProps {
  isConnected: boolean;
}
console.log("Socket Context is mounted!");

export const SocketContext = createContext<SocketContextProps | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
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
