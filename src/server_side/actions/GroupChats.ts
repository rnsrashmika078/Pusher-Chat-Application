"use server";
import { GroupMembers } from "@/src/types";
import connectDB from "../backend/lib/connectDB";
import Group from "../backend/models/Group";
import Message from "../backend/models/Message";
export async function getAllGroups(userId: string) {
  try {
    await connectDB();
    const findGroup = await Group.find({
      $or: [{ "groupMembers.userId": userId }, { createdBy: userId }],
    }).sort({ createdAt: 1 });
    console.log("findGroup", findGroup);

    if (!findGroup) {
      return {
        success: false,
        message: "No groups found",
        data: null,
        error: "no groups",
      };
    }
    return {
      success: true,
      message: "Groups fetched Successfully",
      data: JSON.parse(JSON.stringify(findGroup)),
      error: null,
    };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return {
      data: [],
      error: error,
    };
  }
}
export async function createGroup(formData: FormData) {
  try {
    await connectDB();
    const groupName = formData.get("groupName");
    const createdBy = formData.get("createdBy");
    const groupMembers = JSON.parse(formData.get("groupMembers") as string);

    const newGroup = await Group.create({
      groupName,
      createdBy,
      members: groupMembers,
      message: [],
    });
    if (!newGroup) {
      return {
        success: false,
        message: "Error while creating a group",
        data: null,
      };
    }
    return {
      success: true,
      message: "Group created Successfully",
      data: JSON.parse(JSON.stringify(newGroup)),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}

export async function addFriendToGroup(friend: GroupMembers, groupId: string) {
  try {
    await connectDB();

    // 1️⃣ Find the group first
    const group = await Group.findById(groupId);
    if (!group) {
      return {
        success: false,
        message: "Group not found",
        data: null,
      };
    }

    const alreadyMember = group.groupMembers.some(
      (member: GroupMembers) => member.userId === friend.userId
    );

    if (alreadyMember) {
      return {
        success: false,
        message: "User is already a member of this group",
        data: JSON.parse(JSON.stringify(alreadyMember)),
      };
    }

    // 3️⃣ Add new friend if not in group
    group.groupMembers.push(friend);
    const updatedGroup = await group.save();

    return {
      success: true,
      message: "Friend added successfully",
      data: JSON.parse(JSON.stringify(updatedGroup)),
    };
  } catch (error) {
    return {
      success: false,
      message: "Error adding friend",
      data: [],
      error,
    };
  }
}

export async function updateMessageStatus(
  convoId: string,
  status: "sent" | "delivered" | "seen"
) {
  console.log("status", status);
  try {
    await connectDB();

    const result = await Message.updateMany(
      { conversationId: convoId },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return { message: "No messages updated" };
    }

    return { message: `Messages updated to ${status}` };
  } catch (error) {
    return {
      message: "Error while processing",
      error,
    };
  }
}
