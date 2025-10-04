"use client";
import {
  setActiveTab,
  setChatWith,
  setStartChat,
} from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { IoCall, IoCheckmarkDoneSharp } from "react-icons/io5";
import { RiChat2Fill, RiLoader2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Conversation, User } from "@/interface/Types";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import { JSX, useEffect, useRef, useState } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import ShowNotification from "./Notification/ShowNotification";
import { useSession } from "next-auth/react";

interface ChatListLayoutProps {
  allUsers?: User[];
  toggle: boolean;
  isLoading: boolean;
  chats: Conversation[];
}
const ChatListPanel: React.FC<ChatListLayoutProps> = ({
  toggle,
  isLoading,
  allUsers,
  chats,
}) => {
  const { data: session } = useSession();
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const [mainTab, setMainTab] = useState<string>("Message");

  const dispatch = useDispatch<ReduxDispatch>();
  const [serachTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  const lastMessages = useSelector(
    (store: ReduxtState) => store.chat.lastMessage
  );
  type MessageStatus = "sent" | "delivered" | "seen";

  const status: Record<MessageStatus, JSX.Element> = {
    sent: <IoCheckmarkDoneSharp />,
    delivered: <IoCheckmarkDoneSharp />,
    seen: <IoCheckmarkDoneSharp color="blue" />,
  };
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
                  mainTab === tabNames[index] ? "bg-[var(--active-tab-color)]" : ""
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
          {mainTab === "FriendRequest" && <ShowNotification />}

          {/* friends chat inboxes */}
          {activeTab !== "Settings" && mainTab === "Message" ? (
            <div className="relative p-5">
              {!isLoading ? (
                chats &&
                chats?.map((friend: Conversation, index: number) => (
                  <div
                    key={index}
                    className="flex gap-3 mt-2 bg-[var(--card-background)] p-3 rounded-2xl shadow-sm"
                    onClick={() => {
                      alert(friend.conversationId);
                      dispatch(
                        setStartChat({
                          id: friend.conversationId!,
                          firstName: friend.otherUserFname!,
                          lastName: friend.otherUserLName!,
                          recieverId: friend.otherUserId,
                        })
                      );
                      dispatch(setChatWith(null));
                    }}
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
                          {friend.otherUserFname + " " + friend.otherUserLName}
                        </h1>
                        <p className="text-xs text-gray-400 ">
                          {/* {friend.recievedtime} */}
                        </p>
                      </div>
                      <div className="flex justify-between items-center ">
                        <div className="flex justify-center items-center gap-1">
                          <p>{status[friend.status as MessageStatus]}</p>
                          {/* whitespace-nowrap overflow-hidden text-ellipsis */}
                          <p className="text-sm text-gray-400">
                            {lastMessages[friend.conversationId] ||
                              friend.lastMessage ||
                              "No messages yet"}
                          </p>
                        </div>
                        {(() => {
                          const unseen = unseenCount.find(
                            (u) => u.id === friend.otherUserId
                          );

                          if (unseen && unseen.id !== session?.user?._id) {
                            return (
                              <span
                                className={`flex justify-center items-center text-[var(--background)] text-sm bg-green-500 w-5 h-5 p-2 rounded-full`}
                              >
                                {step === 0 ? unseen.count - 1 : unseen.count}
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="absolute left-1/2 top-5 animate-spin">
                  <RiLoader2Fill size={25} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
export default ChatListPanel;
