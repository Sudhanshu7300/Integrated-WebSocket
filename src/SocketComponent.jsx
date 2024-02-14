import React, { useEffect, useState } from "react";
import useWebSocket from "./useWebSocket";

const ChatComponent = () => {
  // Provide WebSocket  Api Path
  const socketUrl = "";
  const options = {
    transports: ["websocket"],
    query: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjViZGE0NGY1M2NjOTA3MTAyNjJmNSIsImlhdCI6MTcwMDIyNTYyOCwiZXhwIjoxNzAxNTIxNjI4fQ.rMZ0tu1yrXdDrt1EkhZyGSgNqyDVWFsdz8cbajp76vs",
    },
  };

  const { socket, isSocketConnected } = useWebSocket(socketUrl, options);

  const [contentSrc, setContentSrc] = useState("");
  const [contentType, setContentType] = useState(null);
  const [contentMacId, setContentMacId] = useState(null);
  const sendMessage = () => {
    if (socket) {
      const message = { event: "getLiveLink", macId: "1ec3d1d4781ba8e6" };
      socket.emit("message", message);
    }
  };
  useEffect(() => {
    if (isSocketConnected) {
      sendMessage();
      socket.on("getLiveLink", (message) => {
        setContentType(message?.filetype);
        setContentSrc(message?.contentLink);
        setContentMacId(message?.mac_id);
      });
    }
  }, [isSocketConnected]);

  return (
    <div>
      <p>Socket Status: {isSocketConnected ? "Connected" : "Disconnected"}</p>
      <p>content Link {contentSrc}</p>
      <p>Content Type{contentType}</p>
      <p> Mac ID {contentMacId}</p>
    </div>
  );
};

export default ChatComponent;
