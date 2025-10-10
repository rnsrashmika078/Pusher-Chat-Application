"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {  useSelector } from "react-redux";
import {  ReduxtState } from "@/src/redux/store";
import { IoCall, IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { useSession } from "next-auth/react";

import { RiLoader2Fill } from "react-icons/ri";
import Dropdown from "@/src/lib/Components/Basic/Dropdown";
import AddFriendsToGroup from "../../modals/AddFriendsToGroup";
import { GroupMessage } from "@/src/types";
import { v4 as uuidv4 } from "uuid";
import Textarea from "@/src/lib/Components/Intermediate/textarea/Textarea";

const GroupChatArea = () => {
  const viewRef = useRef<HTMLDivElement | null>(null);
  // const isInView = useInView(viewRef, {
  // rootMargin: "-10% 0px -10% 0px",
  // once: false,  set to true if you only want to trigger once
  // });
  //Redux Global States

  const groupChat = useSelector((store: ReduxtState) => store.chat.groupChat);
  const groupLiveMessages = useSelector(
    (store: ReduxtState) => store.chat.groupLiveMessages
  );
  const onlineUsers = useSelector(
    (store: ReduxtState) => store.chat.onlineUsers
  );

  //React Local States

  const [messages, setMessages] = useState<(GroupMessage | null)[]>([]);

  //Variables

  // hooks declarations
  const { data: session } = useSession();

  const [loading, setLoading] = useState<"null" | "send" | "retrive">("null");

  // useEffect(() => {
  //   if (
  //     isInView &&
  //     !isSeen &&
  //     messages[messages.length - 1]?.senderId !== session?.user._id
  //   ) {
  //     handleupdateMessageStatus();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isInView, messages.length]);

  // useEffect(() => {
  //   console.log("CHANGES HAPPEN", groupLiveMessages?.groupId);
  //   setIsSeen(false);
  //   dispatch(setSeenMessageStatus(null));
  //   if (groupLiveMessages?.groupId === groupChat?._id) {
  //     setMessages((prev) => [...prev, groupLiveMessages]);
  //   }
  //   // updateWholeChatState([groupLiveMessage]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [groupLiveMessages]);

  // const updateWholeChatState = (msg: Chat[]) => {
  //   if (msg?.length > 0) {
  //     dispatch(setWholeChat(msg));

  //     // set last message for this conversation
  //     const last = msg.at(-1);
  //     if (last) {
  //       dispatch(
  //         setLastMessage({
  //           conversationId: last.conversationId,
  //           message: last.message,
  //         })
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    setMessages((prev) => {
      const exist = prev.some((m) => m?._id === groupLiveMessages?._id);
      if (exist) {
        return prev;
      }
      return [...prev, groupLiveMessages];
    });
  }, [groupLiveMessages]);

  // async function handleAddFriend() {
  //   const formdata = new FormData();
  //   if (chat && session) {
  //     const id1 = chat.chatWith?.userId;
  //     const id2 = session?.user._id;
  //     if (!id1 || !id2) return;
  //     const combinedId = id1 < id2 ? id1 + id2 : id2 + id1;

  //     formdata.append("userId", session?.user._id ?? "");
  //     formdata.append("conversationId", combinedId);
  //     formdata.append("otherUserId", chat.chatWith?.userId ?? "");
  //     formdata.append("userFname", session?.user?.firstname ?? "");
  //     formdata.append("userLname", session?.user?.lastname ?? "");
  //     formdata.append("otherUserFname", chat.chatWith?.firstname ?? "");
  //     formdata.append("otherUserLName", chat.chatWith?.lastname ?? "");
  //     formdata.append("otherUserLName", chat.chatWith?.lastname ?? "");
  //     formdata.append(
  //       "lastMessage",
  //       messages[messages.length - 1]?.message ?? ""
  //     );
  //     formdata.append("status", messages[messages.length - 1]?.status ?? "");
  //   }

  //   setCurrentChat({
  //     id: formdata.get("conversationId") as string,
  //     recieverId: formdata.get("otherUserId") as string,
  //     firstName: formdata.get("userFname") as string,
  //     lastName: formdata.get("userLname") as string,
  //   });
  //   const result = await AddFriendServerAction(formdata);
  //   if (result) {
  //     mutate();
  //   } else {
  //   }
  // }
  // useEffect(() => {
  //   const handleUpdateLastSeen = async () => {
  //     const isOnline = onlineUsers.some(
  //       (user) => user.id === startChat?.recieverId
  //     );

  //     if (isOnline) {
  //       setCheckOnline(true);
  //     } else {
  //       setCheckOnline(false);

  //       if (session?.user._id) {
  //         const res = await getLastSeen(startChat?.recieverId);
  //         if (res) {
  //           setLastSeen(res.data.lastSeen);
  //         }
  //       }
  //     }
  //   };
  //   handleUpdateLastSeen();
  // }, [onlineUsers, startChat?.recieverId, session?.user._id]);

  const sendMessage = async (message: string) => {
    setLoading("send");

    // _id: string;
    // groupName: string;
    // createdby: string;
    // groupMembers: GroupMember[];
    // message: Message[];
    // avatar?: string;

    if (groupChat && session) {
      const date = new Date();
      const userMessage: GroupMessage = {
        _id: uuidv4(),
        groupId: groupChat._id,
        senderId: session?.user._id ?? "",
        firstName: session?.user?.firstname ?? "",
        lastName: session?.user?.lastname ?? "",
        message: message ?? "",
        status: "delivered",
        createdAt: date,
      };
      setMessages((prev) => [...prev, userMessage]);

      // status: isOnline ? "delivered" : "sent",
      // updateWholeChatState([userMessage]);
      try {
        const res = await fetch("/api/presence-message-group", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage,
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
  type MessageStatus = "sent" | "delivered" | "seen";
  const status: Record<MessageStatus, JSX.Element> = {
    sent: <IoCheckmarkDoneSharp />,
    delivered: <IoCheckmarkDoneSharp />,
    seen: <IoCheckmarkDoneSharp color="blue" />,
  };
  const [toggle, setToggle] = useState<boolean>(false);
  const [selection, setSelection] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleSelection = (selection: string) => {
    if (selection === "add friends") {
      setVisibility(true);
      setSelection(selection);
    }
  };

  console.log("onlineUsers", onlineUsers);

  //set dynamic colors for users name
  const dynamicTextColor = ["red", "green", "blue", "purple", "orange", "teal"];

  return (
    <div className="h-full flex flex-col w-full ">
      {/* Header */}
      <div className="top-0 flex  justify-between items-center shadow-xs bg-gray-100  border-b border-[var(--border)] sticky  z-10">
        <div className="px-2 py-2 flex gap-3 items-center">
          <Image
            src="https://randomuser.me/api/portraits/men/27.jpg"
            alt="Reviewer"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="">
            <h1 className="font-bold">{groupChat?.groupName}</h1>
            <p className="text-sm text-gray-400">{onlineUsers.length} Online</p>
          </div>
        </div>
        <div className="relative flex gap-5 text-sm text-gray-500">
          <span>
            <IoCall size={25} color="gray" />
          </span>
          <span>
            <FaVideo size={25} color="gray" />
          </span>
          <span>
            <IoMdMore
              size={25}
              color="gray"
              onClick={() => setToggle(!toggle)}
            />
          </span>
          {toggle && (
            <span className="absolute top-8 right-0">
              <Dropdown
                options={[
                  "Group settings",
                  "Show Group Members",
                  "Add friends",
                ]}
                setSelection={handleSelection}
              />
            </span>
          )}
          {visibility && <AddFriendsToGroup setVisibility={setVisibility} />}
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 px-5 py-3 bg-gray-200">
        {/* {chat.chatWith?.lastMessage === undefined && !saved && ( */}
        {loading !== "retrive" ? (
          messages.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 mb-3 flex-col inset-0">
              <div className="flex flex-col justify-center items-center">
                <span className="text-xl font-semibold text-gray-800">
                  Welcome to the Group Chat!
                </span>
                <span className="text-sm text-gray-600 mt-2">
                  You’re all set to start a group conversation.
                </span>
                {/* <span className="text-sm text-gray-600"></span> */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  {/* <Button
                    name="Let's Get Chatting"
                    onClick={handleAddFriend}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  ></Button> */}
                </div>
              </div>
            </div>
          )
        ) : selection === "show group members" ? (
          <div>HI THERE</div>
        ) : (
          <div className="absolute left-1/2 top-5 animate-spin">
            <RiLoader2Fill size={25} />
          </div>
        )}

        {messages &&
          messages.length > 1 &&
          messages.map((user, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                user?.senderId === session?.user._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex justify-center items-end gap-2 max-w-[75%] px-4 py-2  text-sm shadow-sm ${
                  user?.senderId === session?.user._id
                    ? " bg-white rounded-bl-2xl"
                    : // : " bg-gradient-to-r from-red-700 to-gray-900 rounded-br-2xl"
                      "bg-white rounded-br-2xl"
                }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-bold titalic`}
                    style={{
                      color:
                        user?.firstName === session?.user.firstname
                          ? "red"
                          : dynamicTextColor[i],
                    }}
                  >
                    {user?.firstName === session?.user.firstname
                      ? "You"
                      : user?.firstName}
                  </span>
                  <span className={`text-sm text-black flex w-fit`}>
                    {user?.message}
                  </span>
                </div>
                <span className={`text-sm text-white`}>
                  {(user?.senderId === session?.user._id &&
                    user?.status &&
                    status[user.status as MessageStatus]) ??
                    null}
                </span>
                {/* message created time -> send time  */}
                <span className="text-[10px]  text-gray-500 font-extralight">
                  {user?.createdAt &&
                    new Date(user?.createdAt).toLocaleTimeString([], {
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
        {/* <input
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
        /> */}
        <Textarea className="" sendMessage={sendMessage} />

        {/* <Button
          radius="full"
          className="rounded-full bg-purple-500 text-white px-4 py-2"
          onClick={() => {
            if (!typeMessage.trim()) return;
            sendMessage();
          }}
        >
          <IoSend size={25} />
        </Button> */}
      </div>
    </div>
  );
};

export default GroupChatArea;
