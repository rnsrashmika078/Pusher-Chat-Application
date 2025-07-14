"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { BsBookmarkStar } from "react-icons/bs";
import { RiDraftFill } from "react-icons/ri";
import { MdOutlinePresentToAll } from "react-icons/md";
import { GrSchedulePlay } from "react-icons/gr";
import { IoIosSettings } from "react-icons/io";
import IconButton from "@/src/lib/Components/Basic/IconButton";
import { MdOutlineSearch } from "react-icons/md";
import { BiDockLeft } from "react-icons/bi";

import { IoMdArrowBack } from "react-icons/io";
import { MdArchive } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdAccessTimeFilled } from "react-icons/md";

import { RiMessage2Fill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";

import { EmailType } from "@/src/types";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { setChatWith } from "@/src/redux/chatSlicer";
import MessageArea from "./MessageArea";

interface EmailProps {
  emails: EmailType[];
}
const ChatLayout: React.FC<EmailProps> = () => {
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
        {/* <SidePanel /> */}

        {/* This is the only scrollable section */}
        <div
          className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full md:w-1/2"}
    bg-[var(--panel-bg-color)]   lg:flex-1  overflow-y-auto scrollbar-hidden  relative  border-r border-[var(--border)]`}
        >
          <ListPanel toggle={toggle} />
        </div>
        <div
          className={`w-8 h-8  bg-black  text-white rounded-full fixed bottom-0 left-5 -translate-x-0 -translate-y-1/2  flex justify-center items-center shadow-2xl lg:hidden transition-all duration-300 ease-out z-[9999] opacity-25 hover:opacity-100`}
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
            <MessageArea />
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
const SidePanel = () => {
  return (
    <div className="select-none transition-all w-12 md:w-auto ">
      <div className="hidden md:flex">
        <IconButton name="Compose">
          <FiPlus size={20} />
        </IconButton>
      </div>

      <div className="flex md:hidden text-white bg-blue-500 my-5  p-1  w-7 mx-3  justify-center items-center rounded-full hover:curosor-pointer hover:bg-blue-400 transition-all">
        <FiPlus size={20} />
      </div>
      <div className="text-white">
        {[
          {
            name: "inbox",
            icon: <HiOutlineInboxArrowDown size={20} />,
            color: "bg-blue-500",
            count: 5,
          },
          {
            name: "Starred",
            icon: <BsBookmarkStar size={20} />,
            color: "bg-red-500",
            count: 3,
          },
          {
            name: "Draft",
            icon: <RiDraftFill size={20} />,
            color: "bg-green-500",
            count: 1,
          },
          {
            name: "Sent",
            icon: <MdOutlinePresentToAll size={20} />,
            color: "bg-orange-500",
            count: 7,
          },
          {
            name: "Settings",
            icon: <IoIosSettings size={20} />,
            color: "",
            count: 1,
          },
          {
            name: "Shedules",
            icon: <GrSchedulePlay size={20} />,
            color: "",
            count: 2,
          },
          {
            name: "Management",
            icon: <GrSchedulePlay size={20} />,
            color: "",
            count: 2,
          },
        ].map((item, index) => (
          <React.Fragment key={index}>
            {(index === 5 || index === 0) && (
              <>
                {index == 5 && (
                  <div className="hidden md:flex text-gray-500  flex-col mx-5 mt-10">
                    Future Plans
                  </div>
                )}
                <div className="flex md:hidden border border-gray-600"></div>
              </>
            )}

            <div
              className={`${
                index == 5 ? "mt-2" : "mt-3"
              } flex justify-between transition-all duration-300  gap-6  items-center hover:bg-gray-900 p-3 px-4 md:px-8 my-3 rounded-r-full `}
            >
              <div className="flex gap-5 justify-center items-center">
                <div className="">{item.icon}</div>
                <div className="hidden md:block">{item.name}</div>
              </div>
              {item.color && (
                <div
                  className={` justify-center items-center hidden md:flex rounded-full w-5 h-5 ${item.color} `}
                >
                  {item.count}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
const ListPanel = ({ toggle }: { toggle: boolean }) => {
  const friends = [
    {
      email: "rnsrashmika078@gmail.com",
      firstname: "Rashmika",
      lastname: "Siriwardhana",
      profilePicture: "https://localhost:3000/api",
      lastmessage: "I will take over🤣",
      recievedtime: "3:25 PM",
      unread: 12,
    },
    {
      email: "mahela@gmail.com",
      firstname: "Mahela",
      lastname: "Jayawardhana",
      lastmessage: "This is the best time to take over the shit out of it🤌",
      recievedtime: "7:51 AM",
      unread: 6,
    },
  ];
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="relative w-full select-none">
      {!toggle && (
        <div>
          <div className="flex justify-between shadow-sm p-15 bg-white py-6.5  ">
            <span>
              <RiMessage2Fill size={30} color="purple" />
            </span>
            <span>
              <IoCall size={30} color="purple" />
            </span>
            <span>
              <IoIosMail size={30} color="purple" />
            </span>

            <span>
              <FaPeopleGroup size={30} color="purple" />
            </span>
            <span>
              <Image
                src="https://randomuser.me/api/portraits/men/27.jpg"
                alt="Reviewer"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            </span>
          </div>
          <div className="sticky  bg-white p-5 shadow-sm mt-1">
            <h1 className="text-4xl font-bold mb-2">Chats</h1>
            <div className="flex gap-2 p-2 text-xs font-bold justify-start items-start">
              <p>DIRECT</p>
              <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
              <p className="text-gray-300">GROUP</p>
              <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
              <p className="text-gray-300">PUBLIC</p>
              <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
            </div>
            <input
              placeholder="Search"
              className="mb-2 border shadow-sm rounded-2xl p-2 pl-5 w-full bg-gray-100 border-gray-200"
            ></input>
          </div>
          <div className="p-5">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex gap-3 mt-2 bg-white p-3 rounded-2xl shadow-sm"
                onClick={() => dispatch(setChatWith(friend))}
              >
                <Image
                  src="https://randomuser.me/api/portraits/men/27.jpg"
                  alt="Reviewer"
                  width={10}
                  height={10}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="w-full">
                  <div className="flex justify-between items-center ">
                    <h1 className="font-bold">
                      {friend.firstname + " " + friend.lastname}
                    </h1>
                    <p className="text-xs text-gray-400 ">
                      {friend.recievedtime}
                    </p>
                  </div>
                  <div className="flex justify-between items-center ">
                    {/* whitespace-nowrap overflow-hidden text-ellipsis */}
                    <p className="text-sm text-gray-400 ">
                      {friend.lastmessage.length > 35
                        ? friend.lastmessage.slice(0, 35) + "....."
                        : friend.lastmessage}
                    </p>
                    <p className="flex justify-center items-center text-white text-sm bg-green-500 w-5 h-5 p-2 rounded-full">
                      {friend.unread}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Options = () => {
  return (
    <div className="flex gap-5 px-5">
      <IoMdArrowBack />
      <MdArchive />
      <RiErrorWarningFill />
      <RiDeleteBin4Fill />
      <MdAccessTimeFilled />
      <HiOutlineDotsVertical />
    </div>
  );
};
