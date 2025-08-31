"use client";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import React, { useState } from "react";
import Image from "next/image";
import { useDebounce } from "@/src/hooks/useDebounce";
import { User } from "@/interface/Types";
import { RxCross1 } from "react-icons/rx";
import { useSession } from "next-auth/react";
import Button from "@/src/lib/Components/Basic/Button";
import { setChatWith } from "@/src/redux/chatSlicer";
import { useDispatch } from "react-redux";
import { ReduxDispatch } from "@/src/redux/store";

interface AddFriendProps {
  allUsers: User[];
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddFriend: React.FC<AddFriendProps> = ({ allUsers, setVisibility }) => {
  const [serachTerm, setSearchTerm] = useState<string>("");
  const { data: session } = useSession();

  const handleSearch = useDebounce(
    (value: string) => setSearchTerm(value),
    300
  );

  const filteredData = allUsers?.filter((user: User) => {
    if (user._id === session?.user._id) return false; // Exclude current user

    return (
      (user.firstname &&
        user.firstname.toLowerCase().includes(serachTerm.toLowerCase())) ||
      (user.lastname &&
        user.lastname.toLowerCase().includes(serachTerm.toLowerCase()))
    );
  });
  const filteredUsers = allUsers?.filter((user: User) => {
    if (user._id === session?.user._id) return false; // Exclude current user

    return user;
  });

  const dispatch = useDispatch<ReduxDispatch>();

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
        <div className="space-y-4">
          <SearchArea
            placeholder="Enter Friends Firstname of Lastname"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {serachTerm !== ""
            ? filteredData?.map((user, index) => {
                // const isPending = friendRequests?.some(
                //   (req: FriendRequest) =>
                //     (req.senderId === data._id ||
                //       req.targetUserId === data._id) &&
                //     req.status === "pending"
                // );
                return (
                  <ul
                    key={index}
                    className="gap-2 text-gray-500 text-sm p-2 rounded-sm bg-gray-200"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={user.profileImage ?? "/noimage.jpg"}
                          alt="profile"
                          width={25}
                          height={25}
                          className="rounded-full object-cover w-6 h-6 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
                        />
                        {user.firstname + " " + user.lastname}
                      </div>
                      <Button
                        name="Send Message"
                        onClick={() =>
                          dispatch(
                            setChatWith({
                              userId: user._id!,
                              myId: session?.user._id ?? "asd",
                              firstname: user.firstname!,
                              lastname: user.lastname!,
                              profileimage: user.profileImage!,
                              lastMessage: "",
                              username: user.username!,
                            })
                          )
                        }
                      ></Button>
                    </div>
                  </ul>
                );
              })
            : filteredUsers.slice(0, 5)?.map((user, index) => {
                return (
                  <ul
                    key={index}
                    className="gap-2 text-gray-500 text-sm p-2 rounded-sm bg-gray-200"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={user.profileImage ?? "/noimage.jpg"}
                          alt="profile"
                          width={25}
                          height={25}
                          className="rounded-full object-cover w-6 h-6 border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 transform active:scale-95"
                        />
                        {user.firstname + " " + user.lastname}
                      </div>

                      <Button
                        name="Send Message"
                        onClick={() =>
                          dispatch(
                            setChatWith({
                              userId: user._id!,
                              myId: session?.user._id ?? "",
                              firstname: user.firstname!,
                              lastname: user.lastname!,
                              profileimage: user.profileImage!,
                              lastMessage: "",
                              username: user.username!,
                            })
                          )
                        }
                      ></Button>
                    </div>
                  </ul>
                );
              })}
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">
          You can add many friend as you want!
        </p>
      </div>
    </div>
  );
};

export default AddFriend;
