"use client";
import React, { useEffect, useState } from "react";
import { BiDockLeft } from "react-icons/bi";
import { EmailType } from "@/src/types";
import SidePanel from "../Chat/SidePanel";
import EmailListPanel from "./EmailListPanel";
import EmailMainPanel from "./EmailMainPanel";

interface EmailProps {
  emails: EmailType[];
}
const EmailLayout: React.FC<EmailProps> = ({ emails }) => {
  const [width, setWidth] = useState(0);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

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
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden border-2 border-t-[var(--border)]  ">
      <div className="flex flex-1 bg-gray-800 overflow-hidden">
        <SidePanel />
        {/* This is for  only scrollable section */}
        <div
          className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full"}
    bg-[var(--panel-bg-color)]  rounded-l-4xl lg:flex-1  overflow-y-auto scrollbar-hidden p-1 relative  border-r border-[var(--border)]`}
        >
          <EmailListPanel toggle={toggle} emails={emails} />
        </div>
        <div
          className={`w-8 h-8  bg-black left-2 text-white rounded-full fixed flex justify-center items-center shadow-2xl lg:hidden bottom-2 transition-all duration-300 ease-out opacity-25 hover:opacity-100  ${
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
          <EmailMainPanel />
        </div>
      </div>
    </div>
  );
};

export default EmailLayout;
