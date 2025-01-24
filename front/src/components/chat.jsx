import { useState } from "react";
import "./chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [userId, setUserId] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Handle room selection and connecting to the selected room
  const joinRoom = () => {
    if (room.trim() === "") return;

    const userUniqueId = generateUniqueId();
    setUserId(userUniqueId);

    const ws = new WebSocket(`ws://localhost:8000/ws/${room}`);
    ws.onopen = () => {
      console.log(`Connected to room: ${room}`);
    };
    ws.onmessage = (event) => {
      if (room === "bot_room") {
        console.log(userId);
        setIsTyping(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: "Bot", text: `${event.data}` },
          ]);
          setIsTyping(false);
        }, 1000);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: userUniqueId, text: event.data },
        ]);
      }
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    ws.onclose = () => {
      console.log("Disconnected from room");
    };

    setSocket(ws);
  };

  // Function to generate a unique user ID (could be more complex or handled by the server)
  const generateUniqueId = () => {
    return "user-" + Math.random().toString(36).substr(2, 9);
  };

  // Handle sending messages
  const sendMessage = () => {
    if (input.trim() !== "" && socket) {
      setMessages((prev) => [
        ...prev,
        { sender: "You", text: input },
      ]);
      socket.send(input); // Send message to server
      setInput(""); // Clear input after sending
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center text-primary mb-4">Join a Room</h2>

      {/* Room Selection Dropdown */}
      {!socket && (
        <div className="d-flex mb-4">
          <select
            className="form-select"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            aria-label="Select room"
          >
            <option value="">Select a room...</option>
            <option value="bot_room">Bot Room</option>
            <option value="broadcast">Broadcast Room</option>
          </select>
          <button onClick={joinRoom} className="btn btn-primary ms-2">
            Join Room
          </button>
        </div>
      )}

      {/* Chat Window */}
      {socket && (
        <div>
          <h4 className="text-center text-muted mb-4">Room: {room}</h4>
          <div
            className="card shadow-sm"
            style={{ height: "400px", overflowY: "auto", padding: "10px" }}
          >
            <div className="card-body">
              <div className="chat-box">
                {messages.map((msg, index) => (
                  <div key={index} className="mb-3">
                    {/* Display sender's name (user ID or Bot) */}
                    <div
                      className={`text-muted small ${
                        msg.sender === "You"
                          ? "text-end me-2"
                          : "text-start ms-2"
                      }`}
                    >
                      {msg.sender === "You" ? "You" : msg.sender}
                    </div>

                    {/* Message bubble */}
                    <div
                      className={`d-flex mb-2 ${
                        msg.sender === "You"
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-3 ${
                          msg.sender === "You"
                            ? "bg-info text-white"
                            : "bg-light"
                        }`}
                        style={{ maxWidth: "80%" }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                {isTyping && (
                  <div className="d-flex mb-2 justify-content-start">
                    <div
                      className="p-2 rounded-3 bg-light text-muted"
                      style={{ maxWidth: "80%" }}
                    >
                      Bot is typing...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="d-flex mt-3">
            <input
              type="text"
              className="form-control me-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
