"use client";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import React, { useState } from "react";
import Image from "next/image";
// import { useDebounce } from "@/src/hooks/useDebounce";
import { RxCross1 } from "react-icons/rx";
import Button from "@/src/lib/Components/Basic/Button";
import {  useSelector } from "react-redux";
import {  ReduxtState } from "@/src/redux/store";
import { GroupMembers } from "@/src/types";
import { addFriendToGroup } from "@/src/server_side/actions/GroupChats";
import { setSimpleNotification } from "@/src/redux/NotifySlicer";

interface AddFriendsToGroupProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFriendsToGroup: React.FC<AddFriendsToGroupProps> = ({
  setVisibility,
}) => {



  //   const filteredData = friends?.filter((user: Conversation) => {
  //     if (user._id === session?.user._id) return false; // Exclude current user

  //     return (
  //       (user.firstname &&
  //         user.firstname.toLowerCase().includes(serachTerm.toLowerCase())) ||
  //       (user.lastname &&
  //         user.lastname.toLowerCase().includes(serachTerm.toLowerCase()))
  //     );
  //   });
  //   const filteredUsers = allUsers?.filter((user: User) => {
  //     if (user._id === session?.user._id) return false; // Exclude current user

  //     return user;
  //   });

  return (
    <div className="fixed inset-0 w-full backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add a Friend</h2>
          <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
            <RxCross1
              className="w-5 h-5"
              onClick={() => setVisibility((prev) => !prev)}
            />
          </div>
        </div>
        <FriendsCard />
      </div>
    </div>
  );
};
export default AddFriendsToGroup;

const FriendsCard = () => {
  const friends = useSelector((store: ReduxtState) => store.chat.friends);
  const [, setAddedFriend] = useState<GroupMembers[]>([]);
  const groupChat = useSelector((store: ReduxtState) => store.chat.groupChat);

  console.log("Friends", friends);
  const handleAddFriendToGroup = async (
    friend: GroupMembers,
    groupId: string
  ) => {
    const res = await addFriendToGroup(friend, groupId);
    setSimpleNotification({ id: 346, message: res.message ?? " " });
    setAddedFriend((prev) => {
      const exist = prev.some((item) => item.userId === friend.userId);
      if (exist) return prev;
      return [...prev, friend];
    });
  };
  return (
    <div className="space-y-4">
      <SearchArea
        placeholder="Enter Friends Firstname or Lastname"
        // onChange={(e) => handleSearch(e.target.value)}
      />
      {friends?.map((user, index) => {
        return (
          <ul
            key={index}
            className="gap-2 text-gray-500 text-sm p-2 rounded-sm bg-gray-200"
          >
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={"/noimage.jpg"}
                  alt="profile"
                  width={25}
                  height={25}
                  className="rounded-full object-cover w-6 h-6 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
                />
                {user.otherUserFname + " " + user.otherUserLName}
              </div>
              <Button
                name="Add to Group"
                onClick={() => {
                  handleAddFriendToGroup(
                    {
                      firstName: user.otherUserFname,
                      lastName: user.otherUserLName,
                      userId: user.otherUserId,
                    },
                    groupChat?._id as string
                  );
                }}
              ></Button>
            </div>
          </ul>
        );
      })}
      <p className="text-sm text-gray-500 text-center mt-4">
        You can add many friend as you want!
      </p>
    </div>
  );
};
