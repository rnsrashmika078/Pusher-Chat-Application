"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import Button from "@/src/lib/Components/Basic/Button";
import { IoCall, IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { AddFriendServerAction } from "@/src/server_side/actions/FriendServerAction";
import { KeyedMutator } from "swr";
import { useSession } from "next-auth/react";
import { Chat, StartChat } from "@/interface/Types";
import {
  getChatHistory,
  updateMessageStatus,
} from "@/src/server_side/actions/ChatHistoryServerAction";
import {
  clearLiveMessages,
  setSeenMessageStatus,
  setWholeChat,
} from "@/src/redux/chatSlicer";
import { setLastMessage } from "@/src/redux/chatSlicer";
import { getLastSeen } from "@/src/server_side/actions/UserLastSeenServerAction";
import { useInView } from "framer-motion";
import { RiLoader2Fill } from "react-icons/ri";

interface MessageProps {
  useFor: "Group" | "Chat";
  mutate: KeyedMutator<
    { data: unknown; error?: undefined } | { data: never[]; error: unknown }
  >;
}

//@ts

const ChatArea = ({ useFor, mutate }: MessageProps) => {
  const viewRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(viewRef, {
    // rootMargin: "-10% 0px -10% 0px",
    // once: false,  set to true if you only want to trigger once
  });
  //Redux Global States
  const chat = useSelector((store: ReduxtState) => store.chat);
  const liveMessages = useSelector(
    (store: ReduxtState) => store.chat.liveMessages
  );
  const startChat = useSelector((store: ReduxtState) => store.chat.startChat);

  const onlineUsers = useSelector(
    (store: ReduxtState) => store.chat.onlineUsers
  );

  const [checkOnline, setCheckOnline] = useState<boolean>(
    onlineUsers.some((user) => user.id === startChat?.recieverId)
  );
  const [currentChat, setCurrentChat] = useState<StartChat | null>(null);

  const seenMessageStatus = useSelector(
    (store: ReduxtState) => store.chat.seenMessageStatus
  );

  const [lastSeen, setLastSeen] = useState<Date>();

  //React Local States
  const [typeMessage, setTypeMessage] = useState<string>("");
  const [messages, setMessages] = useState<Chat[]>([]);

  //Variables

  // hooks declarations
  const { data: session } = useSession();

  const dispatch = useDispatch<ReduxDispatch>();
  const [isSeen, setIsSeen] = useState<boolean>(false);
  const [loading, setLoading] = useState<"null" | "send" | "retrive">("null");

  useEffect(() => {
    if (
      isInView &&
      !isSeen &&
      messages[messages.length - 1]?.senderId !== session?.user._id
    ) {
      handleupdateMessageStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, messages.length]);
  useEffect(() => {
    setLoading("retrive");
    dispatch(clearLiveMessages());
    setMessages([]);
    const getAllMessage = async () => {
      const result = await getChatHistory(
        chat.chatWith?.userId ?? startChat?.id
      );
      if (result) {
        setLoading("null");
        setMessages(result.data ?? []);
        updateWholeChatState(result.data ?? []);
        return;
      }
    };
    getAllMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, session?.user._id, startChat?.id, chat.chatWith?.userId]);

  useEffect(() => {
    setIsSeen(false);
    dispatch(setSeenMessageStatus(null));

    if (liveMessages.length > 0) {
      const liveMessage = liveMessages[liveMessages.length - 1];
      if (liveMessage.conversationId === startChat?.id) {
        setMessages((prev) => [...prev, liveMessage]);
      }
      updateWholeChatState([liveMessage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveMessages]);

  const updateWholeChatState = (msg: Chat[]) => {
    if (msg?.length > 0) {
      dispatch(setWholeChat(msg));

      // set last message for this conversation
      const last = msg.at(-1);
      if (last) {
        dispatch(
          setLastMessage({
            conversationId: last.conversationId,
            message: last.message,
          })
        );
      }
    }
  };

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
      formdata.append("otherUserLName", chat.chatWith?.lastname ?? "");
      formdata.append(
        "lastMessage",
        messages[messages.length - 1]?.message ?? ""
      );
      formdata.append("status", messages[messages.length - 1]?.status ?? "");
    }

    setCurrentChat({
      id: formdata.get("conversationId") as string,
      recieverId: formdata.get("otherUserId") as string,
      firstName: formdata.get("userFname") as string,
      lastName: formdata.get("userLname") as string,
    });
    const result = await AddFriendServerAction(formdata);
    if (result) {
      mutate();
    } else {
    }
  }
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
    handleUpdateLastSeen();
  }, [onlineUsers, startChat?.recieverId, session?.user._id]);

  const sendMessage = async () => {
    setLoading("send");
    const isOnline = onlineUsers.some(
      (user) => user.id === startChat?.recieverId
    );
    setIsSeen(false);
    if ((currentChat || startChat) && session) {
      const date = new Date();
      const userMessage: Chat = {
        conversationId: startChat?.id ?? currentChat?.id ?? "",
        senderId: session?.user._id ?? "",
        recieverId: startChat?.recieverId ?? currentChat?.recieverId ?? "",
        message: typeMessage ?? "",
        createdAt: date,
        status: isOnline ? "delivered" : "sent",
      };
      setMessages((prev) => [...prev, userMessage]);
      updateWholeChatState([userMessage]);
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
            status: isOnline ? "delivered" : "sent",
            createdAt: new Date(),
          }),
        });
        if (!res.ok) {
          console.error("Failed to send friend request:", await res.json());
          return;
        }
        setLoading("null");
        return;
      } catch (error) {
        console.error("Error sending friend request:", error);
        return;
      }
    }
  };

  const handleupdateMessageStatus = (status?: string) => {
    const lastMessage = messages[messages.length - 1];
    const convoId = messages[messages.length - 1]?.conversationId;
    if (convoId) {
      const update = async () => {
        if (!status) {
          try {
            await fetch("/api/message-seen", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                conversationId: convoId,
                senderId: lastMessage.senderId,
                messageId: lastMessage.recieverId,
              }),
            });
            setIsSeen(true);
          } catch (error) {
            console.error("Error sending seen notification:", error);
          }
        } else {
          await updateMessageStatus(convoId, "delivered");
        }
      };
      update();
    }
  };

  useEffect(() => {
    if (seenMessageStatus) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.status !== "seen" ? { ...msg, status: "seen" } : msg
        )
      );
    }
  }, [seenMessageStatus]);

  useEffect(() => {
    setMessages([]);
  }, [chat.chatWith?.firstname, startChat?.firstName]);

  type MessageStatus = "sent" | "delivered" | "seen";
  const status: Record<MessageStatus, JSX.Element> = {
    sent: <IoCheckmarkDoneSharp />,
    delivered: <IoCheckmarkDoneSharp />,
    seen: <IoCheckmarkDoneSharp color="blue" />,
  };

  console.log(startChat?.firstName);
  console.log(startChat?.lastName);

  return (
    <div className="flex flex-col w-full h-full select-none">
      {/* Header */}
      <div className="  top-0 flex justify-between items-center p-5 py-6 shadow-xs bg-[var(--background)] border-b border-[var(--border)] sticky  z-10">
        <div className="flex gap-3 items-center">
          <Image
            src="https://randomuser.me/api/portraits/men/27.jpg"
            alt="Reviewer"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          {useFor === "Chat" ? (
            <div className="">
              <h1 className="font-bold">
                {/* {chat.chatWith?.firstname ??
                  startChat?.firstName ??
                  +" " + (chat.chatWith?.lastname ?? startChat?.lastName ?? "")} */}
                {startChat?.firstName || chat.chatWith?.firstname}{" "}
                {startChat?.lastName || chat.chatWith?.lastname}
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
          ) : null}
        </div>
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
      </div>

      {/* Messages */}
      <div className="relative flex-1 px-5 py-3">
        {/* {chat.chatWith?.lastMessage === undefined && !saved && ( */}
        {loading !== "retrive" ? (
          messages.length === 0 && (
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
          )
        ) : (
          <div className="absolute left-1/2 top-5 animate-spin">
            <RiLoader2Fill size={25} />
          </div>
        )}
        {/* )} */}
        {messages.map((user, i) => (
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
                  : // : " bg-gradient-to-r from-red-700 to-gray-900 rounded-br-2xl"
                    " bg-gradient-to-r from-blue-600 to-blue-300 rounded-br-2xl"
              }`}
            >
              <span className={`text-sm text-white`}>{user.message}</span>
              <span className={`text-sm text-white`}>
                {(user.senderId === session?.user._id &&
                  user.status &&
                  status[user.status as MessageStatus]) ??
                  null}
              </span>
              {/* message created time -> send time  */}
              <span className="text-[10px] text-gray-200 font-extralight">
                {user.createdAt &&
                  new Date(user.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center" ref={viewRef}></div>
      {/* Input bar */}
      <div className="flex items-center gap-4 p-4 bg-[var(--search)] border-b border-[var(--border)] border-t sticky bottom-0 z-20">
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

export default ChatArea;
