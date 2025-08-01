"use client";
import React, { useEffect, useState } from "react";
import { BiDockLeft } from "react-icons/bi";
import { EmailType } from "@/src/types";
import { useSelector } from "react-redux";
import { ReduxtState } from "@/src/redux/store";
import MessageArea from "./MessageArea";
import SidePanel from "./SidePanel";
import ChatListPanel from "./ChatListPanel";
import { useSession } from "next-auth/react";

interface EmailProps {
  emails: EmailType[];
}
const ChatLayout: React.FC<EmailProps> = () => {
  const { data: session } = useSession();
  const [width, setWidth] = useState(0);
  const [toggle, setToggle] = useState<boolean>(false);
  const chat = useSelector((store: ReduxtState) => store.chat.chatWith);

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
      if (chat && width < 768) {
        setToggle((prev) => !prev);
      }
    };
    runEffect();
  }, [chat, width]);


  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden border-2 border-t-[var(--border)]  ">
      <div className="flex flex-1 bg-gray-800 overflow-hidden">
        <SidePanel />
        {/* This is the only scrollable section */}
        <div
          className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full md:w-1/2"}
    bg-[var(--panel-bg-color)]   lg:flex-1  overflow-y-auto scrollbar-hidden  relative  border-r border-[var(--border)] rounded-l-4xl`}
        >
          <ChatListPanel toggle={toggle} />
        </div>
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
        <div
          className={`bg-[var(--panel-bg-color)] flex ${
            toggle ? "flex-1" : "flex-2"
          } h-[calc(100vh-4rem)]  overflow-y-auto w-full`}
        >
          {chat ? (
            <MessageArea useFor="Chat" />
          ) : (
            <div className="text-2xl flex justify-center items-center m-auto">
              Chat With your Friend
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
