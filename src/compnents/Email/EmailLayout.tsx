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
import { GoStarFill } from "react-icons/go";
import { BiDockLeft } from "react-icons/bi";

import { IoMdArrowBack } from "react-icons/io";
import { MdArchive } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdAccessTimeFilled } from "react-icons/md";
import { IContent, EmailType } from "@/src/types";

import Image from "next/image";
import AutoGrowTextarea from "@/src/lib/Components/Basic/AutoGrowTextArea";
import Button from "@/src/lib/Components/Basic/Button";
import SendEmail from "@/src/server_side/actions/SendEmail";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { setCurrentEmail, setCurrentInbox } from "@/src/redux/emailSlicer";

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

        {/* This is the only scrollable section */}
        <div
          className={`overflow-x-hidden flex transition-all duration-100 ease-in-out
    ${toggle ? "w-0" : "w-full"}
    bg-[var(--panel-bg-color)]  rounded-l-4xl lg:flex-1  overflow-y-auto scrollbar-hidden p-5 relative  border-r border-[var(--border)]`}
        >
          <ListPanel toggle={toggle} emails={emails} />
        </div>
        <div
          className={`w-8 h-8  bg-black left-2 text-white rounded-full fixed flex justify-center items-center shadow-2xl lg:hidden bottom-2 transition-all duration-300 ease-out ${
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
          <MainPanel />
        </div>
      </div>
    </div>
  );
};

export default EmailLayout;
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
const ListPanel = ({
  toggle,
  emails,
}: {
  toggle: boolean;
  emails: EmailType[];
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  return (
    <div className="relative w-full select-none">
      {!toggle && (
        <div>
          <div className="sticky -top-5 bg-[var(--search)] py-2 px-2 transition-all">
            <input
              type="search"
              placeholder="Search"
              className={`${
                toggle ? "hidden" : "flex"
              } border border-[var(--border)]   items-center justify-center gap-2 w-full py-2 px-4 rounded-full bg-white  shadow-sm hover:shadow-md transition`}
            />
            <button
              className={`${
                toggle ? "hidden" : "absolute"
              } top-0 right-0 mr-5 mt-4 text-black`}
            >
              <MdOutlineSearch size={25} color="gray" />
            </button>
            <h1 className={`${toggle ? "hidden" : "block"} px-2 mt-4 text-2xl`}>
              Inbox
            </h1>
          </div>
          <div
            className={`${
              toggle ? "hidden" : "block"
            } border border-[var(--border)]`}
          ></div>

          {emails.map((item, index) => (
            <Friends
              onClick={() => dispatch(setCurrentInbox(item))}
              key={index}
              toggle={toggle}
              from={item.from}
              to={item.from}
              header={item.header}
              body={item.body}
              subject={item.subject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type FriendsProps = {
  toggle: boolean;
  from: string;
  to: string;
  header: string;
  subject: string;
  body: string;
  html?: string;
} & React.HTMLAttributes<HTMLDivElement>;
const Friends = ({
  toggle,
  from,
  to,
  header,
  subject,
  body,
  html,
  ...props
}: FriendsProps) => {
  return (
    <div {...props}>
      <div
        className="flex gap-3 mt-2 bg-[var(--card-background)] rounded-2xl p-2 hover:bg-[var(--hover-bg-color)] hover:cursor-pointer transition-all duration-100"
        //   onClick={() => dispatch(setChatWith(friend))}
      >
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={40}
          height={40}
          className="w-10 h-10  min-h-10 max-w-10 max-h-10 rounded-full object-cover"
        />
        <div className={`w-full `}>
          <div className="flex justify-between items-start ">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-400">{to}</p>
              <h1 className="text-sm font-bold">{subject}</h1>
              <p className="text-xs text-gray-400 truncate  max-w-[180px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[150px] xl:max-w-[250px]">
                {body}
              </p>
            </div>
            <div className="flex flex-col items-center justify-between ">
              <p className="text-[10px] md:text-xs text-gray-400">3.24 PM</p>
              <div className="py-3 ">
                <GoStarFill
                  stroke="black"
                  fill="yellow"
                  size={20}
                  className="text-yellow-400 drop-shadow-[0_0_0.5px_black]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!toggle && (
        <div className="border border-[var(--border)] w-full mt-2 "></div>
      )}
    </div>
  );
};

const MainPanel = () => {
  // const email = `Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka

  // Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka

  // Dear Nimsara,
  // I hope you are doing well. I am writing to inform you about the current progress and updates regarding our project. Over the past few weeks, we have made significant improvements and completed several key milestones as planned.

  // Our development team has been working hard to ensure everything is on track, and I truly appreciate the continued support and guidance. However, there are a few areas that still require clarification, especially around the next set of deliverables and the integration timeline.

  // Please let me know a convenient time for a quick discussion or if there's anything specific you would like us to prioritize moving forward.

  // Thank you for your time and consideration.

  // Best regards,
  // Rashmika Siriwardhana
  // Undergraduate – BICT Software Engineering
  // University of South Eastern University of Sri Lanka
  // `;
  const inbox = useSelector((store: ReduxtState) => store.inbox.currentInbox);

  const content: IContent = {
    from: "rnsrashmika078@gmail.com",
    to: "gamini12327rns@gmail.com",
    subject: "First Email On Ozone",
    header: "Congatualation for the first email sending by the ozone",
    body: "Hi , Rashmika, I am so greatfull that the first email sending by ozone app and my involement in this exclusive movement.Thank you in advance!",
  };

  return (
    <div className="flex flex-col w-full p-4 sm:p-5 gap-3 sm:gap-4 md:gap-6">
      {/* Top button + image row */}
      <div className="flex justify-between items-center w-full gap-2 sm:gap-4">
        <button className="p-2 sm:p-3 w-full rounded-xl bg-transparent border border-[var(--border)] text-[var(--secondary-color)] text-sm sm:text-base shadow-sm hover:shadow-md transition">
          Click here to load new Mails
        </button>
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
        />
      </div>

      {/* Options */}
      <div className="sticky top-0 text-[var(--foreground)] bg-[var(--background)] py-5">
        <Options />
      </div>

      {/* Title + avatar */}
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <Image
          src="https://randomuser.me/api/portraits/men/27.jpg"
          alt="Reviewer"
          width={60}
          height={60}
          className="w-12 h-12 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center items-start gap-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
            {inbox?.subject}
          </h1>
          <h3 className="text-xs sm:text-sm text-gray-600">
            {inbox?.to} <span className="text-gray-400">to</span> me
          </h3>
        </div>
      </div>

      {/* AutoGrowTextarea */}
      {/* Main Content Area */}
      <h1 className="text-2xl">{inbox?.header}</h1>

      <div className="">
        <AutoGrowTextarea
          readOnly
          value={inbox?.body}
          className="w-full text-base sm:text-lg md:text-xl text-gray-700 border-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
        ></AutoGrowTextarea>
      </div>
      <div className="flex gap-5 pb-5">
        <Button name={"Reply"} onClick={() => SendEmail(content)} />
        <Button name={"Forward"} />
      </div>
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
