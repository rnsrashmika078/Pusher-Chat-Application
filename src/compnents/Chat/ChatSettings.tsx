import { setSettingsActiveTab } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { User } from "@/interface/Types";
import { Session } from "next-auth";
import SignOutButton_ClientSide from "@/src/lib/Components/Basic/SignOutButton_ClientSide";
const ChatSettings = () => {
  const settingAT = useSelector(
    (store: ReduxtState) => store.chat.settingsActiveTab
  );
  const { data: session } = useSession();
  const activeTabStyle =
    "flex transition-all duration-200 bg-red-500 px-0.5 -left-2 rounded-2xl h-1/2 absolute top-1/2 -translate-y-1/2";
  const dispatch = useDispatch<ReduxDispatch>();
  const Tabs = ["General", "Chat", "Profile", "Personalization", "Help"];
  return (
    <div className="flex justify-between h-[calc(100vh-16.5rem)] p-5 overflow-hidden  ">
      <div className="flex flex-row w-full">
        <div className="flex flex-1">
          <div className="flex flex-col space-y-2 border-r px-2 border-gray-200 ">
            {Tabs.map((item, index) => (
              <ul
                className={`${
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
        </div>
        <Profile session={session} settingAT={settingAT} />
      </div>
    </div>
  );
};

export default ChatSettings;

interface CommonProp {
  session: Session | null;
  settingAT: string;
}

const Profile: React.FC<CommonProp> = ({ session, settingAT }) => {
  return (
    <div className="flex  flex-3 w-full ">
      {settingAT === "General" && <div></div>}
      {settingAT === "Profile" && (
        <div className="flex flex-col  w-full">
          <h1 className="font-bold mb-1 text-4xl ">{settingAT}</h1>
          <p className="text-xs">your profile settings</p>
          <div className="mt-3 border-b border-gray-200 w-full mb-3"></div>
          <div className="mt-3 flex flex-col items-start justify-start mb-3">
            <Image
              src={session?.user.profileImage ?? "/noimage.jpg"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full object-cover w-24 h-24 mb-2 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
            />
            <h1 className="font-bold text-lg mx-3">
              {session?.user.firstname} {session?.user.lastname}
            </h1>
            <p className="text-sm mx-3">{session?.user.username}</p>
          </div>
          <div className="mt-2 border-b border-gray-200 mb-3"></div>
          <SignOutButton_ClientSide variant="windows" />
        </div>
      )}
    </div>
  );
};
