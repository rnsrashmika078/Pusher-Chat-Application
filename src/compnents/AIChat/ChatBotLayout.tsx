"use client";
import React, { useEffect, useState } from "react";
import { BiDockLeft } from "react-icons/bi";
import { EmailType } from "@/src/types";
import { useSelector } from "react-redux";
import { ReduxtState } from "@/src/redux/store";

import MessageArea from "../Chat/MessageArea";
import SidePanel from "../Chat/SidePanel";
import AIChatListPanel from "./AIChatListPanel";
import useScreenSize from "@/src/hooks/ScreenSize";

interface EmailProps {
  emails: EmailType[];
}
const ChatBotLayout: React.FC<EmailProps> = () => {
  const width = useScreenSize();

  const [toggle, setToggle] = useState<boolean>(false);
  const aiChat = useSelector(
    (store: ReduxtState) => store.aiChat.openChat?.title
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (width > 768) {
        setToggle(false);
      }
    }
  }, [aiChat, width]);

  // useEffect(() => {
  //   const runEffect = async () => {};
  //   runEffect();
  // }, [aiChat, width]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden border-2 border-t-[var(--border)]  ">
      <div className="flex flex-1 bg-gray-800 overflow-hidden">
        {/* <div className="text-red-500">{width}</div> */}
        <SidePanel />
        {/* This is the only scrollable section */}
        <div
          className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full"}
    bg-[var(--panel-bg-color)]   lg:flex-1  overflow-y-auto scrollbar-hidden  relative  border-r border-[var(--border)] rounded-l-4xl`}
        >
          <AIChatListPanel toggle={toggle} />
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
          {aiChat ? (
            <MessageArea useFor="AI" />
          ) : (
            <div className="text-2xl flex justify-center items-center m-auto"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBotLayout;

// const Options = () => {
//   return (
//     <div className="flex gap-5 px-5">
//       <IoMdArrowBack />
//       <MdArchive />
//       <RiErrorWarningFill />
//       <RiDeleteBin4Fill />
//       <MdAccessTimeFilled />
//       <HiOutlineDotsVertical />
//     </div>
//   );
// };
