"use client";
import { Conversation } from "@/interface/Types";
import { setSimpleNotification } from "@/src/redux/NotifySlicer";
import {
  createGroup,
} from "@/src/server_side/actions/GroupChats";
import { Groups } from "@/src/types";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface CreateGroupProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  friends: Conversation[];
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  setVisibility,
  friends,
}) => {
  type SelectedFriend = {
    userId: string;
    firstName: string;
    lastNames: string;
  };
  const { data: session } = useSession();
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<SelectedFriend[]>([]);
  const [groups, setGroups] = useState<Groups[]>([]);
  const handleFriendSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => {
      const friend = friends.find((f) => String(f.otherUserId) === opt.value);
      return {
        userId: friend?.otherUserId ?? "",
        firstName: friend?.otherUserFname ?? "",
        lastName: friend?.otherUserLName ?? "",
      };
    });
    // @ts-ignore
    setSelectedFriends(selected);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return alert("Please enter a group name");
    console.log("Group Created:", { groupName, selectedFriends });
    setVisibility(false);
    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("createdBy", session?.user._id ?? "");
    formData.append("groupMembers", JSON.stringify(selectedFriends));

    const res = await createGroup(formData);
    if (res.success) {
      setGroups(res.data);
      setSimpleNotification({ id: 123, message: res.message ?? "" });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Create Group</h2>
          <RxCross1
            className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => setVisibility(false)}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block  text-gray-600 text-sm mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full border  border-gray-300 h-fit rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Add Friends
            </label>
            <select
              multiple
              onChange={handleFriendSelect}
              className="w-full space-y-1 flex justify-between border rounded-2xl border-gray-300 px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {friends &&
                friends
                  .filter(
                    (friend, index, self) =>
                      index ===
                      self.findIndex(
                        (f) => f.otherUserId === friend.otherUserId
                      )
                  )
                  .map((friend) => (
                    <option
                      className="p-1 pl-4 rounded-lg w-full"
                      key={friend.otherUserId}
                      value={friend.otherUserId}
                    >
                      {friend.otherUserFname} {friend.otherUserLName}
                      {friend.status === "sent" ? "🟢" : "🔴"}
                    </option>
                  ))}
            </select>
          </div>
          <button
            onClick={handleCreateGroup}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
