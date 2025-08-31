import { setActiveTab, setSettingsActiveTab } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { MdKeyboardBackspace } from "react-icons/md";

import SignOutButton_ClientSide from "@/src/lib/Components/Basic/SignOutButton_ClientSide";
import Button from "@/src/lib/Components/Basic/Button";
const ChatSettings = () => {
  const settingAT = useSelector(
    (store: ReduxtState) => store.chat.settingsActiveTab
  );
  const activeTabStyle =
    "flex transition-all duration-200 bg-red-500 px-0.5 -left-2 rounded-2xl h-1/2 absolute top-1/2 -translate-y-1/2";
  const dispatch = useDispatch<ReduxDispatch>();
  const Tabs = ["General", "Chat", "Profile", "Help"];
  return (
    <div className="p-5 rounded-2xl w-full ">
      <h1 className="flex gap-1 items-center text-[clamp(1rem,1vw,1.5rem)]  p-2 border-b border-gray-200 mb-3 font-bold">
        <MdKeyboardBackspace
          size={35}
          className="transition-all hover:cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => dispatch(setActiveTab("Inbox"))}
        />
        Account Settings
      </h1>

      <div className="flex justify-between h-[calc(100vh-16.5rem)] overflow-hidden w-full ">
        <div className="flex flex-row w-full">
          <div className="flex flex-1">
            <div className="flex flex-col space-y-2 border-r px-2 border-gray-200 ">
              {Tabs.map((item, index) => (
                <ul
                  className={`text-xs sm:text-sm md:text-sm lg:text-xl xl:text-xl ${
                    settingAT === item ? "bg-gray-200 rounded-sm" : ""
                  } relative text-gray-500 p-2`}
                  key={index}
                  onClick={() => dispatch(setSettingsActiveTab(item))}
                >
                  <div
                    className={`${settingAT === item ? activeTabStyle : ""}`}
                  ></div>
                  {item}
                </ul>
              ))}
            </div>
            <Profile settingAT={settingAT} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;

interface CommonProp {
  settingAT: string;
}

const Profile: React.FC<CommonProp> = ({ settingAT }) => {
  return (
    <div className=" flex flex-3 w-full p-5 justify-start items-start overflow-auto">
      {settingAT === "General" && <div></div>}
      {settingAT === "Profile" && (
        <div className="flex flex-col  w-full">
          <h1 className="font-bold mb-1 text-[clamp(1rem,2vw,1.5rem)] ">
            {settingAT}
          </h1>
          <div className="mt-3 border-b border-gray-200 w-full mb-3"></div>
          <UserInfo />
          <div className="mt-2 border-b border-gray-200 mb-3"></div>
          <SignOutButton_ClientSide variant="windows" className="w-50" />
        </div>
      )}
    </div>
  );
};
const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="">
      <div className="mt-3 flex flex-col sm:flex-col lg:flex-row xl:flex-row md:flex-row items-start justify-start mb-3">
        <Image
          src={
            session?.user.profileImage ?? session?.user.image ?? "/noimage.jpg"
          }
          alt="profile"
          width={100}
          height={100}
          className="rounded-full object-cover w-24 h-24 mb-2 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
        />
        <div className="justify-start items-start flex flex-col">
          <h1 className="font-bold  mx-3">
            {session?.user.firstname} {session?.user.lastname}
          </h1>
          <p className=" text-sm mx-3">
            {session?.user.username ?? session?.user.email}
          </p>
        </div>
      </div>
      <div>
        <Button name="Edit" radius="md" variant="windows" />
      </div>
    </div>
  );
};
