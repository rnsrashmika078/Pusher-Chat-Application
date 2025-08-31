"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import Button from "@/src/lib/Components/Basic/Button";
import { IoCall } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { AddFriendServerAction } from "@/src/server_side/actions/FriendServerAction";
import  { KeyedMutator } from "swr";
import { useSession } from "next-auth/react";
import { Chat,  StartChat } from "@/interface/Types";
import {
  getChatHistory,
} from "@/src/server_side/actions/ChatHistoryServerAction";
import {
  clearLiveMessages,
  setWholeChat,
} from "@/src/redux/chatSlicer";
import { setLastMessage } from "@/src/redux/chatSlicer";
import {
  getLastSeen,
} from "@/src/server_side/actions/UserLastSeenServerAction";

interface MessageProps {
  useFor: "AI" | "Chat";
  mutateChats: KeyedMutator<
    { data: unknown; error?: undefined } | { data: never[]; error: unknown }
  >;
}

const MessageArea = ({ useFor, mutateChats}: MessageProps) => {
  //Redux Global States
  const chat = useSelector((store: ReduxtState) => store.chat);
  const liveMessages = useSelector(
    (store: ReduxtState) => store.chat.liveMessages
  );
  const startChat = useSelector((store: ReduxtState) => store.chat.startChat);

  //React Local States
  const [typeMessage, setTypeMessage] = useState<string>("");
  const [messages, setMessages] = useState<Chat[]>([]);

  //Variables

  // hooks declarations
  const { data: session } = useSession();

  const dispatch = useDispatch<ReduxDispatch>();
  useEffect(() => {
    dispatch(clearLiveMessages());
    const getAllMessage = async () => {
      const result = await getChatHistory(
        session?.user._id,
        startChat?.id ?? ""
      );
      if (result) setMessages(result.data ?? []);
    };
    getAllMessage();
  }, [dispatch, session?.user._id, startChat]);

  useEffect(() => {
    setMessages((prev) => [...prev, ...liveMessages]);
  }, [liveMessages]);

  useEffect(() => {
    if (messages?.length > 0) {
      dispatch(setWholeChat(messages));

      // set last message for this conversation
      const last = messages.at(-1);
      if (last) {
        dispatch(
          setLastMessage({
            conversationId: last.conversationId,
            message: last.message,
          })
        );
      }
    }
  }, [messages, dispatch]);

  const [currentChat, setCurrentChat] = useState<StartChat | null>(null);
  async function handleAddFriend() {
    const formdata = new FormData();
    if (chat && session) {
      const id1 = chat.chatWith?.userId;
      const id2 = session?.user._id;
      if (!id1 || !id2) return;
      const combinedId = id1 < id2 ? id1 + id2 : id2 + id1;

      formdata.append("userId", session?.user._id ?? "");
      formdata.append("conversationId", combinedId);
      formdata.append("otherUserId", chat.chatWith?.userId ?? "");
      formdata.append("userFname", session?.user?.firstname ?? "");
      formdata.append("userLname", session?.user?.lastname ?? "");
      formdata.append("otherUserFname", chat.chatWith?.firstname ?? "");
      formdata.append("otherUserLName", chat.chatWith?.lastname ?? "");
      formdata.append(
        "lastMessage",
        messages[messages.length - 1]?.message ?? ""
      );
    }

    setCurrentChat({
      id: formdata.get("conversationId") as string,
      recieverId: formdata.get("otherUserId") as string,
      firstName: formdata.get("userFname") as string,
      lastName: formdata.get("userLname") as string,
    });
    const result = await AddFriendServerAction(formdata);
    if (result) {
      mutateChats();
    } else {
    }
  }

  //for send message -> pusher and store message on db
  const sendMessage = async () => {
    if ((currentChat || startChat) && session) {
      const userMessage: Chat = {
        conversationId: startChat?.id ?? currentChat?.id ?? "",
        senderId: session?.user._id ?? "",
        recieverId: startChat?.recieverId ?? currentChat?.recieverId ?? "",
        message: typeMessage ?? "",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);

      try {
        setTypeMessage("");
        const res = await fetch("/api/presence-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversationId: startChat?.id ?? currentChat?.id ?? "",
            recieverId: startChat?.recieverId ?? currentChat?.recieverId ?? "",
            userFname: startChat?.firstName ?? currentChat?.firstName ?? "",
            userLname: startChat?.lastName ?? "",
            senderId: session?.user._id,
            message: typeMessage ?? "",
            lastMessage: typeMessage ?? "",
            status: "sent",
            createdAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error("Failed to send friend request:", await res.json());
        }
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
  };

  const onlineUsers = useSelector(
    (store: ReduxtState) => store.chat.onlineUsers
  );

  console.log("😍😍ONline users", onlineUsers);
  console.log("😍😍user id ", startChat?.recieverId);

  const [checkOnline, setCheckOnline] = useState<boolean>(
    onlineUsers.some((user) => user.id === startChat?.recieverId)
  );

  const [lastSeen, setLastSeen] = useState<Date>();

  useEffect(() => {
    const handleUpdateLastSeen = async () => {
      const isOnline = onlineUsers.some(
        (user) => user.id === startChat?.recieverId
      );

      if (isOnline) {
        setCheckOnline(true);
      } else {
        setCheckOnline(false);

        if (session?.user._id) {
          const res = await getLastSeen(startChat?.recieverId);
          if (res) {
            setLastSeen(res.data.lastSeen);
          }
        }
      }
    };

    handleUpdateLastSeen(); // ✅ actually call it
  }, [onlineUsers, startChat?.recieverId, session?.user._id]);

  console.log("LastSeen", lastSeen);
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
                {(startChat?.firstName ?? chat.chatWith?.firstname) +
                  " " +
                  (startChat?.lastName ?? chat.chatWith?.lastname)}
              </h1>
              <p className="text-sm text-gray-400">
                {checkOnline
                  ? "Online"
                  : lastSeen
                  ? (() => {
                      const ls = new Date(lastSeen);
                      const now = new Date();

                      const isToday =
                        ls.getDate() === now.getDate() &&
                        ls.getMonth() === now.getMonth() &&
                        ls.getFullYear() === now.getFullYear();

                      return isToday
                        ? ls.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          }) // ex: 09:30 PM
                        : `${ls.toDateString()} ${ls.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`;
                    })()
                  : "Offline"}
              </p>
            </div>
          ) : (
            <div>
              {/* <h1 className="font-bold">{aiChat?.title}</h1> */}
              {/* <p className="text-sm text-gray-400">Last seen 3 hours ago</p> */}
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
      <div className="relative flex-1 px-5 py-3">
        {/* {chat.chatWith?.lastMessage === undefined && !saved && ( */}
        {messages.length === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 mb-3 flex-col inset-0">
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl font-semibold text-gray-800">
                Welcome to the Chat!
              </span>
              <span className="text-sm text-gray-600 mt-2">
                You’re all set to start a conversation.
              </span>
              <span className="text-sm text-gray-600"></span>
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  name="Let's Get Chatting"
                  onClick={handleAddFriend}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                ></Button>
              </div>
            </div>
          </div>
        )}
        {/* )} */}
        {...messages.map((user, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              user.senderId === session?.user._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex justify-center items-end gap-2 max-w-[75%] px-4 py-2  text-sm shadow-sm ${
                user.senderId === session?.user._id
                  ? " bg-gradient-to-r from-purple-600 to-purple-400 rounded-bl-2xl"
                  : " bg-gradient-to-r from-blue-600 to-blue-300 rounded-br-2xl"
              }`}
            >
              <span className={`text-sm text-white`}>{user.message}</span>
              {/* message created time -> send time  */}
              <span className="text-[10px] text-gray-200 font-extralight">
                {user.createdAt?.split("T")[1].split("Z")[0].slice(0, 5)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-4 p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20">
        <input
          value={typeMessage}
          onChange={(e) => setTypeMessage(e.target.value)}
          onKeyDown={
            (e) => {
              if (!typeMessage.trim()) return;
              if (e.key === "Enter") sendMessage();
            }
            // e.key === "Enter" && (sendMessage(), handleMessages(new Date()))
          }
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 p-2 px-4 rounded-2xl border border-gray-300 outline-none"
        />
        <Button
          radius="full"
          className="rounded-full bg-purple-500 text-white px-4 py-2"
          onClick={() => {
            if (!typeMessage.trim()) return;
            sendMessage();
          }}
        >
          <IoSend size={25} />
        </Button>
      </div>
    </div>
  );
};

export default MessageArea;
