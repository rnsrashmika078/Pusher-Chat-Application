"use client";
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Groups} from "@/src/types";
import { setGroupChat, setStartChat } from "@/src/redux/chatSlicer";
import { RiLoader2Fill } from "react-icons/ri";

interface GroupCardProps {
  groups: Groups[];
  isLoading: boolean;
  
}

const GroupCard: React.FC<GroupCardProps> = ({
  groups,
  isLoading,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-5 animate-spin">
        <RiLoader2Fill size={25} />
      </div>
    );
  }

  return (
    <>
      {groups &&
        groups?.map((grp: Groups, index: number) => (
          <div
            key={index}
            className="flex gap-3 mt-2 bg-[var(--card-background)] p-3 rounded-2xl shadow-sm cursor-pointer"
            onClick={() => {
              dispatch(setStartChat(null));
              dispatch(setGroupChat(grp));
            }}
          >
            <Image
              src="/group.png"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h1 className="font-bold">
                  {grp.groupName || "Unnamed Group"}
                </h1>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-1">
                  {/* <p>{status[friend.status as MessageStatus]}</p>*/}
                  <p className="text-sm text-gray-400">
                    {/* {grp.message[grp.message.length - 1]?.message || */}
                    {/* "No messages yet */}
                  </p>
                </div>

                {/* {(() => {
                const unseen = unseenCount?.find(
                  (u) => u.id === friend.otherUserId
                );

                if (unseen && unseen.id !== session?.user?._id) {
                  return (
                    <span className="flex justify-center items-center text-[var(--background)] text-sm bg-green-500 w-5 h-5 p-2 rounded-full">
                      {step === 0 ? unseen.count - 1 : unseen.count}
                    </span>
                  );
                }
                return null;
              })()} */}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default GroupCard;
