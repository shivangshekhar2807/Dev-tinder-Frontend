import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const { chatId } = useParams();
  // console.log(chatId);

  const userData = useSelector((state) => state.user);
  const userId = userData?._id;
  const firstName = userData.firstName;

  const [messages, setMessages] = useState([
    // { id: 1, text: "Hello! How are you?", sender: "other" },
    // { id: 2, text: "I'm good, thanks! What about you?", sender: "me" },
    // { id: 3, text: "Doing great, thanks for asking!", sender: "other" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [firstame, setFirstame] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    console.log("hello");
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    // setMessages([...messages, { id: Date.now(), text: newMessage, sender: "me" }]);
   
    socket.emit("sendMessage", { firstName, userId, chatId, text: newMessage });
    setNewMessage("");
  };

  const fetchChat = async () => {
    try {
      const res = await axios.get(BASE_URL + `/chat/${chatId}`, {
        withCredentials: true,
      });

      const chat = res.data.data.messages;

      const finalChat = chat?.map((item) => {
        //  const senderId =
        //    typeof item.senderId === "object"
        //      ? item.senderId._id
        //      : item.senderId;

        //  const senderType =
        //    senderId?.toString() === userId.toString() ? "me" : "other";
        const senderType = item.senderId._id === userId ? "me" : "other";
        return {
          id: item._id,
          text: item.text,
          sender: senderType,
        };
      });

      let metaData;

      for (let item of chat) {
        if (item.senderId._id == chatId) {
          metaData = item.senderId;
          break;
        }
      }

      setFirstame(metaData.firstName);
      setPhotoUrl(metaData.photoUrl);

      setMessages(finalChat);

      console.log("res chat", res.data.data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchChat();
  // }, []);

  useEffect(() => {
    if (userId && chatId) {
      fetchChat();
    }
  }, [userId, chatId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, chatId });

    socket.on(
      "messageReceived",
      ({ userId: senderId, firstName, text, sender }) => {
        //  setMessages((prev) => [
        //    ...prev,
        //    { id: Date.now(), text, sender: "other" },
        //  ]);
        const senderType = senderId === userId ? "me" : "other";
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text, sender: senderType },
        ]);
        console.log("firstname", firstName, "text", text);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, chatId]);



  useEffect(() => {
    scrollToBottom();
  }, [messages]); // scroll every time messages update

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center w-full m-5">
      {/* Container */}
      <div className="card bg-base-100 shadow-xl w-full max-w-md min-h-[70vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-primary text-primary-content">
          <h2 className="text-lg font-bold">Chat</h2>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{firstame || "User"}</span>
            <img
              // src="https://via.placeholder.com/30"
              src={
                photoUrl ||
                "https://cdn-icons-png.flaticon.com/512/6995/6995660.png"
              }
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[60vh] min-h-[40vh]">
          {messages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-400">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-content"
                      : "bg-base-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex p-3 border-t bg-primary">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 mr-2 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;