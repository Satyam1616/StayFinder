import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import AppContext from "./AuthContext";
import { toast } from "sonner";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(AppContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io("http://localhost:3000", {
      query: { userId: user._id },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("register", user._id); // Register user ID with server
    });

    newSocket.on("booking-added", (data) => {
      if (data.hostId === user._id) {
        toast.success("New booking request received.");
      }
    });

    newSocket.on("booking-updated", (data) => {
      console.log(data.status);
      if (data.status === "approved") toast.success(data.message);
      else toast.error(data.message);
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
