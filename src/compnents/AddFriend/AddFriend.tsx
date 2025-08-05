"use client";
import SearchArea from "@/src/lib/Components/Basic/SearchArea";
import React, { useState } from "react";
import Image from "next/image";
import { useDebounce } from "@/src/hooks/useDebounce";
import { User } from "@/interface/Types";
import { FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import SendRequestButton from "../Chat/SendRequestButton";
import { useSession } from "next-auth/react";

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
  const filteredData = allUsers?.filter((user) => {
    if (user._id === session?.user._id) return false; // Exclude current user

    return (
      (user.firstname &&
        user.firstname.toLowerCase().includes(serachTerm.toLowerCase())) ||
      (user.lastname &&
        user.lastname.toLowerCase().includes(serachTerm.toLowerCase()))
    );
  });

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
        <form className="space-y-4">
          <SearchArea
            placeholder="Enter Friends Firstname of Lastname"
            onChange={(e) => handleSearch(e.target.value)}
          />
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
                  <SendRequestButton targetId={data._id!}>
                    <FaPlus />
                  </SendRequestButton>
                </div>
              </ul>
            ))}
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          You can add many friend as you want!
        </p>
      </div>
    </div>
  );
};

export default AddFriend;
