"use client";
import {
  setActiveTab,
} from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { IoCall } from "react-icons/io5";
import { RiChat2Fill} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Conversation, User } from "@/interface/Types";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useSession } from "next-auth/react";
import Button from "@/src/lib/Components/Basic/Button";
import CreateGroup from "../modals/CreateGroup";
import { Groups } from "@/src/types";
import ChatCard from "./Cards/ChatCard";
import GroupCard from "./Cards/GroupCard";

interface ChatListLayoutProps {
  allUsers?: User[];
  toggle: boolean;
  isLoading: boolean;
  chats: Conversation[];
  groups: Groups[];
}
const ChatListPanel: React.FC<ChatListLayoutProps> = ({
  toggle,
  isLoading,
  allUsers,
  chats,
  groups,
}) => {
  const { data: session } = useSession();
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const [mainTab, setMainTab] = useState<string>("Message");
  const dispatch = useDispatch<ReduxDispatch>();
  const [serachTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [visibility, setVisibility] = useState<boolean>(false);

  const handleSearch = useDebounce(
    (value: string) => setSearchTerm(value),
    300
  );

  const filteredData = allUsers?.filter(
    (user) =>
      (user.firstname &&
        user.firstname.toLowerCase().includes(serachTerm.toLowerCase())) ||
      (user.lastname &&
        user.lastname.toLowerCase().includes(serachTerm.toLowerCase()))
  );

  const tabNames = ["Message", "Call", "FriendRequest"];
  const Tabs = [
    <RiChat2Fill key="Message" size={30} color="purple" />,
    <IoCall key="call" size={30} color="purple" />,
    // <div key="friendRequest" className="relative">
    //   <IoIosMail size={30} color="purple" />
    //   <div className="absolute rounded-full bg-red-600 w-5 h-5 flex justify-center items-center text-white -top-1 -right-2"></div>
    // </div>,
  ];

  const [unseenCount, setUnseenCount] = useState<
    {
      id: string;
      user: string;
      count: number;
    }[]
  >([]);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    chats.map((ch) => {
      setStep(step + 1);
      if (ch?.status === "seen") {
        setUnseenCount((prev) =>
          prev.filter((item) => item.id !== ch?.otherUserId)
        );
      } else {
        setUnseenCount((prev) => {
          const existing = prev.find(
            (item) =>
              item.id === ch?.otherUserId && item.id !== session?.user._id
          );
          if (existing) {
            return prev.map((item) =>
              item.id === ch?.otherUserId && item.id !== session?.user._id
                ? { ...item, count: item.count + 1 }
                : item
            );
          } else {
            return [
              ...prev,
              { id: ch?.otherUserId, user: ch?.otherUserFname, count: 1 },
            ];
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats]);

  return (
    <div className="relative w-full select-none border-r  border-[var(--border)] ">
      {!toggle && (
        <div>
          <div className="flex justify-between shadow-sm p-15 bg-[var(--background)]  py-2 border-b border-[var(--border)]">
            {Tabs.map((t, index) => (
              <span
                key={tabNames[index]}
                className={`cursor-pointer p-2 ${
                  mainTab === tabNames[index]
                    ? "bg-[var(--active-tab-color)]"
                    : ""
                }`}
                onClick={() => setMainTab(tabNames[index])}
              >
                {t}
              </span>
            ))}
            <span onClick={() => dispatch(setActiveTab("Settings"))}>
              <Image
                src="https://randomuser.me/api/portraits/men/27.jpg"
                alt="Reviewer"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover hover:scale-105 transform active:scale-95 transition-all duration-200 cursor-pointer border border-gray-300 shadow-sm hover:shadow-md"
              />
            </span>
          </div>

          <div className=" sticky bg-[var(--shadow-background)] p-3 shadow-sm">
            <h1 className="text-4xl font-bold mb-2">{activeTab || "Chat"}</h1>
            <>
              {/* <div className="flex gap-2 p-2 text-xs font-bold justify-start items-start">
                <p>DIRECT</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                <p className="text-gray-300">GROUP</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                <p className="text-gray-300">PUBLIC</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
              </div> */}
              <SearchArea
                ref={searchRef}
                placeholder="Search Chats"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div
                className={`${
                  serachTerm !== "" &&
                  "shadow-xs border z-[-1] border-[var(--border)]  absolute p-5 py-8 space-y-2 top-30 rounded-b-2xl bg-[var(--background)] w-[calc(100%-40px)] overflow-y-auto scrollbar-hidden"
                }`}
              >
                {serachTerm !== "" &&
                  filteredData?.map((data, index) => (
                    <ul
                      key={index}
                      className=" gap-2 text-gray-500 text-sm p-2 rounded-sm bg-gray-200"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src={data.profileImage ?? "/noimage.jpg"}
                            alt="profile"
                            width={25}
                            height={25}
                            className="rounded-full object-cover w-6 h-6 border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
                          />
                          {data.firstname + " " + data.lastname}
                        </div>
                      </div>
                    </ul>
                  ))}
              </div>
            </>
          </div>
          {/* {mainTab === "FriendRequest" && <ShowNotification />} */}
          {/* friends chat inboxes */}
          {activeTab === "Inbox" ? (
            // this is for chat card
            <ChatCard
              chats={chats}
              isLoading={isLoading}
              unseenCount={unseenCount}
              step={step}
            />
          ) : activeTab === "Groups" ? (
            <>
              <div className="p-5">
                <div className="relative flex justify-start">
                  <Button
                    name="Create new Group"
                    radius="xl"
                    onClick={() => setVisibility(true)}
                  />
                </div>
                {visibility && (
                  <CreateGroup setVisibility={setVisibility} friends={chats} />
                )}
                <GroupCard
                  groups={groups}
                  isLoading={isLoading}
                  unseenCount={[]}
                  step={0}
                  status={undefined}
                  lastMessages={undefined}
                />
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};
export default ChatListPanel;
