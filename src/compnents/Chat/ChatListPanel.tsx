"use client";
import { setActiveTab, setChatWith } from "@/src/redux/chatSlicer";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FriendRequest, User } from "@/interface/Types";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/src/hooks/useDebounce";
import Button from "@/src/lib/Components/Basic/Button";
import PusherListenerPrivate from "./Private/PusherListenerPrivate";
import { useSession } from "next-auth/react";
import { setFriendRequest } from "@/src/redux/NotifySlicer";
import {
  AddFriend,
  GetFriendRequests,
} from "@/src/server_side/actions/FriendsRequests";
import useSWR from "swr";
import { friendRequestFetcher } from "@/src/utils/friendRequestFetcher";

interface ChatListLayoutProps {
  allUsers?: User[];
  toggle: boolean;
}
const ChatListPanel: React.FC<ChatListLayoutProps> = ({ toggle, allUsers }) => {
  const { data: session } = useSession();
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
  const activeTab = useSelector((store: ReduxtState) => store.chat.activeTab);
  const friendRequests = useSelector(
    (store: ReduxtState) => store.notify.friendRequest
  );
  const RequestData = useSelector(
    (store: ReduxtState) => store.notify.RequestData
  );
  const chatWith = useSelector(
    (store: ReduxtState) => store.chat.chatWith
  );
  console.log(friendRequests);
  const dispatch = useDispatch<ReduxDispatch>();
  const [serachTerm, setSearchTerm] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebounce(
    (value: string) => setSearchTerm(value),
    300
  );

  const addFriendRequest = async (data: FriendRequest) => {
    const formData = new FormData();
    formData.append("from", data.from);
    formData.append("targetUserId", data.senderId);
    formData.append("senderId", session!.user._id);
    formData.append(
      "message",
      "New Friend request. You have friend request from"
    );

    await AddFriend(formData);
  };
  const [error, setError] = useState<string>();
  const [storedRequests, setStoredRequests] = useState<FriendRequest[]>([]);

  // useEffect(() => {
  //   const getRequests = async () => {
  //     try {
  //       const Requests = await GetFriendRequests(session!.user._id);
  //       console.log("ALL REQUESTS", Requests);
  //       setStoredRequests(Requests);
  //       // alert(JSON.stringify(Requests));
  //     } catch (error: unknown) {
  //       setError(
  //         error instanceof Error ? error.message : "Unknown error occurred"
  //       );
  //     }
  //   };
  //   getRequests();
  // }, [session]);

  const { data } = useSWR(session?.user._id, friendRequestFetcher);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading requests</p>;

  useEffect(() => {
    const exists =
      friendRequests &&
      friendRequests.some(
        (req) =>
          RequestData &&
          req.from === RequestData.from &&
          req.senderId === session?.user._id &&
          req.targetUserId === RequestData.senderId
      );

    // const storeOnDb = storedRequests.map((request,index) => request.)
    if (!exists && RequestData) {
      dispatch(
        setFriendRequest({
          from: RequestData.from,
          senderId: session!.user._id,
          message: `🔔 New Friend request. You have friend request from ${RequestData.from}`,
          targetUserId: RequestData.senderId,
        })
      );
      addFriendRequest(RequestData);
    } else {
      console.log("Duplicate friend request — dispatch skipped.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [RequestData]);

  // const existRequest = storedRequests.map(
  //   (req, index) =>
  //     RequestData &&
  //     req.from === RequestData.from &&
  //     req.senderId === session?.user._id &&
  //     req.targetUserId === RequestData.senderId
  // );
  const filteredData = allUsers?.filter(
    (user) =>
      (user.firstname &&
        user.firstname.toLowerCase().includes(serachTerm.toLowerCase())) ||
      (user.lastname &&
        user.lastname.toLowerCase().includes(serachTerm.toLowerCase()))
  );

  const [mainTab, setMainTab] = useState<string>("Message");

  const tabNames = ["Message", "Call", "Notification"];
  const Tabs = [
    <RiMessage2Fill key="message" size={30} color="purple" />,
    <IoCall key="call" size={30} color="purple" />,
    <div key="notification" className="relative">
      <IoIosMail size={30} color="purple" />
      <div className="absolute rounded-full bg-red-600 w-5 h-5 flex justify-center items-center text-white -top-1 -right-2">
        {friendRequests?.length || data?.length}
      </div>
    </div>,
  ];


  return (
    <div className="relative w-full select-none border-r border-gray-200 shadow-sm">
      {!toggle && (
        <div>
          <div className="flex justify-between shadow-sm p-15 bg-white py-0 ">
            {Tabs.map((t, index) => (
              <span
                key={tabNames[index]}
                className={`cursor-pointer p-2 ${
                  mainTab === tabNames[index] ? "bg-gray-200" : ""
                }`}
                onClick={() => setMainTab(tabNames[index])}
              >
                {t}
              </span>
            ))}
            {/* <span>
              <FaPeopleGroup size={30} color="purple" />
            </span> */}
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

          <div className=" sticky  bg-white p-5 shadow-sm mt-1">
            <h1 className="text-4xl font-bold mb-2">{activeTab || "Chat"}</h1>

            <>
              <div className="flex gap-2 p-2 text-xs font-bold justify-start items-start">
                <p>DIRECT</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                <p className="text-gray-300">GROUP</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
                <p className="text-gray-300">PUBLIC</p>
                <span className="bg-red-500 p-1 w-1 h-1 rounded-full"></span>
              </div>
              <SearchArea
                ref={searchRef}
                onChange={(e) => handleSearch(e.target.value)}
              />

              <div
                className={`${
                  serachTerm !== "" &&
                  "shadow-xs border z-[-1] border-gray-200 absolute p-5 py-8 space-y-2 top-30 rounded-b-2xl bg-white w-[calc(100%-40px)] overflow-y-auto scrollbar-hidden"
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
                            className="rounded-full object-cover w-6 h-6 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
                          />

                          {data.firstname + " " + data.lastname}
                        </div>
                        <Button
                          variant="windows"
                          size="xs"
                          name="+"
                          onClick={() => PusherListenerPrivate}
                        ></Button>
                      </div>
                    </ul>
                  ))}
              </div>
            </>
          </div>
          {activeTab !== "Settings" ? (
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
          ) : null}
        </div>
      )}
    </div>
  );
};
export default ChatListPanel;
