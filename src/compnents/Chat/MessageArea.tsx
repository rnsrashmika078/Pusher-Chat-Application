"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { ReduxtState } from "@/src/redux/store";
import Button from "@/src/lib/Components/Basic/Button";
import { IoCall } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
interface MessageBody {
  time: string;
  username: string;
  message: string;
}
interface MessageProps {
  useFor: "AI" | "Chat";
}

const MessageArea = ({ useFor }: MessageProps) => {
  const chat = useSelector((store: ReduxtState) => store.chat);

  const username = "Rashmika";
  const [typeMessage, setTypeMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageBody[]>([]);

  const handleMessages = (time: Date) => {
    if (typeMessage.length > 0) {
      setMessages([
        ...messages,
        {
          username: username,
          time: time.toLocaleTimeString(),
          message: typeMessage,
        },
      ]);
    }
    setTypeMessage("");
  };

  const aiChat = useSelector((store: ReduxtState) => store.aiChat.openChat);

  return (
    <div className="flex flex-col w-full h-full select-none">
      {/* Header */}

      <div className="flex justify-between items-center p-5 py-6 shadow-xs bg-white border-b border-gray-200 sticky  z-10">
        <div className="flex gap-3 items-center">
          {useFor === "Chat" && (
            <Image
              src="https://randomuser.me/api/portraits/men/27.jpg"
              alt="Reviewer"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          {useFor === "Chat" ? (
            <div>
              <h1 className="font-bold">
                {chat.chatWith?.firstname + " " + chat.chatWith?.lastname}
              </h1>
              <p className="text-sm text-gray-400">Last seen 3 hours ago</p>
            </div>
          ) : (
            <div>
              <h1 className="font-bold">{aiChat?.title}</h1>
              <p className="text-sm text-gray-400">Last seen 3 hours ago</p>
            </div>
          )}
        </div>

        {useFor === "Chat" && (
          <div className="flex gap-5 text-sm text-gray-500">
            <span>
              <IoCall size={25} color="gray" />
            </span>
            <span>
              <FaVideo size={25} color="gray" />
            </span>
            <span>
              <IoMdMore size={25} color="gray" />
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 px-5 py-3">
        {messages[0]?.time && (
          <div className="text-center text-gray-400 mb-3">
            Today {messages[0]?.time}
          </div>
        )}
        {messages.map((user, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              user.username === username ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-[75%] px-4 py-2 shadow-sm text-sm ${
                user.username === username
                  ? "bg-purple-700 text-white rounded-r-3xl rounded-bl-3xl"
                  : "bg-gray-200 text-gray-700 rounded-3xl"
              }`}
            >
              {user.message}
            </p>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-4 p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20">
        <input
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleMessages(new Date())}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 p-2 px-4 rounded-2xl border border-gray-300 outline-none"
        />
        <Button
          radius="full"
          className="rounded-full bg-purple-500 text-white px-4 py-2"
          onClick={() => handleMessages(new Date())}
        >
          <IoSend size={25} />
        </Button>
      </div>
    </div>
  );
};

export default MessageArea;
