"use client";
import React, { useEffect, useState } from "react";
import { BiDockLeft } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import SidePanel from "./SidePanel";
import ChatListPanel from "./ChatListPanel";
import { useSession } from "next-auth/react";
import ChatSettings from "./ChatSettings";
import { User } from "@/interface/Types";
import PusherListenerPresence from "./Presence/PusherListenerPresence";
import useSWR from "swr";
import { getChats } from "@/src/server_side/actions/ChatHistoryServerAction";
import { getAllGroups } from "@/src/server_side/actions/GroupChats";

import ChatArea from "./MessageAreas/ChatArea";
import GroupChatArea from "./MessageAreas/GroupChatArea";
import { setFriends } from "@/src/redux/chatSlicer";
import PusherPresenceGroup from "./Presence/PusherPresenceGroup";

interface LayoutProps {
  allUsers: User[];
}
const ChatLayout: React.FC<LayoutProps> = ({ allUsers }) => {
  const { data: session } = useSession();
  const [width, setWidth] = useState(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const startChat = useSelector((store: ReduxtState) => store.chat.startChat);
  const chatWith = useSelector((store: ReduxtState) => store.chat.chatWith);
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const groupChat = useSelector((store: ReduxtState) => store.chat.groupChat);
  const dispatch = useDispatch<ReduxDispatch>();

  // const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (width > 768) {
        setToggle(false);
      }
    }
  }, [width]);

  useEffect(() => {
    const runEffect = async () => {
      if ((chatWith || startChat || groupChat) && width < 768) {
        setToggle((prev) => !prev);
      }
    };
    runEffect();
  }, [chatWith, startChat, width, groupChat]);

  const liveMessages = useSelector(
    (store: ReduxtState) => store.chat.liveMessages
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!liveMessages[liveMessages.length - 1]?.saved) {
      setSaved(false);
      mutateChats();
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveMessages]);

  const field = saved
    ? [session?.user._id]
    : [
        session?.user._id,
        liveMessages[liveMessages.length - 1]?.conversationId,
      ];

  //get Chats
  const {
    data: chats,
    mutate: mutateChats,
    isLoading: chatLoading,
  } = useSWR(field, getChats, {
    // revalidateOnFocus: true, // refetch when window/tab gets focus
    // revalidateOnReconnect: true,
    // shouldRetryOnError: true,
  });

  //get all chats summary
  useEffect(() => {
    dispatch(setFriends(chats?.data ?? []));
    alert(`ALL CHATS ${JSON.stringify(chats?.data)}`);
  }, [chats?.data, dispatch]);

  const {
    data: groups,
    mutate: mutateGroups,
    isLoading: groupsLoading,
  } = useSWR(session?.user._id, getAllGroups, {
    // revalidateOnFocus: true, // refetch when window/tab gets focus
    // revalidateOnReconnect: true,
    // shouldRetryOnError: true,
  });

  // retrives chats

  // const [groups, setGroups] = useState<Groups[]>([]);
  // useEffect(() => {
  //   if (activeTab !== "Groups") return;
  //   const fetchGroups = async () => {
  //     const res = await getAllGroups(session?.user._id as string);
  //     if (res.success) {
  //       setGroups(res.data);
  //     }
  //   };
  //   fetchGroups();
  // }, [activeTab, session?.user._id]);

  return (
    <div className="bg-[var(--panel-bg-color)] flex h-[calc(100vh-4rem)] overflow-hidden border-2 border-t-[var(--border)]  ">
      <div className="flex flex-1 overflow-hidden">
        <PusherPresenceGroup user_id={session?.user._id} />
        <PusherListenerPresence user_id={session?.user._id} />
        <SidePanel allUsers={allUsers} />
        {activeTab === "Settings" ? (
          <div
            className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
  ${toggle ? "w-0" : "w-full"}
     overflow-y-auto scrollbar-hidden  relative  border-r border-[var(--border)] rounded-l-4xl`}
          >
            <ChatSettings />
          </div>
        ) : (
          <div
            className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full md:w-1/2 lg:basis-[35%] xl:basis-[30%]  "}
        overflow-y-auto scrollbar-hidden  relative  border-r border-[var(--border)] rounded-l-4xl`}
          >
            <ChatListPanel
              toggle={toggle}
              allUsers={allUsers}
              isLoading={chatLoading || groupsLoading}
              groups={groups?.data ?? []}
            />
          </div>
        )}
        <div
          className={`w-8 h-8  bg-black left-2 text-white rounded-full fixed flex justify-center items-center shadow-2xl lg:hidden bottom-2 transition-all duration-300 ease-out opacity-25 hover:opacity-100 ${
            toggle ? "" : ""
          }`}
        >
          <BiDockLeft
            size={20}
            className="hover:cursor-pointer active:scale-105 transition-all"
            onClick={() => setToggle((prev) => !prev)}
          />
        </div>

        {activeTab !== "Settings" && (
          <div
            className={`bg-[var(--panel-bg-color)] flex ${
              toggle ? "flex-1" : "flex-2"
            } h-[calc(100vh-4rem)]  overflow-y-auto w-full`}
          >
            {startChat || chatWith ? (
              <ChatArea useFor="Chat" mutate={mutateChats} />
            ) : groupChat ? (
              <GroupChatArea
                // @ts-expect-error:mutate function shape mismatch error
                mutate={mutateGroups}
              />
            ) : (
              <div className="text-2xl flex justify-center items-center m-auto">
                Chat With your Friend
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
