import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const useWebSocket = (socketUrl, options) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    try {
      // Initialize socket when component mounts
      const newSocket = io.connect(socketUrl, options);
      // Set initial connection status
      setIsSocketConnected(newSocket.connected);

      // Event listener for socket connection status changes
      const handleSocketConnectionChange = (isConnected) => {
        setIsSocketConnected(isConnected);
      };

      // Listen for connection and disconnection events
      newSocket.on("connect", () => {
        handleSocketConnectionChange(true);
      });

      newSocket.on("disconnect", () => {
        handleSocketConnectionChange(false);
      });

      setSocket(newSocket);

      // Clean up socket connection when component unmounts
      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }, []);

  return { socket, isSocketConnected };
};

export default useWebSocket;
