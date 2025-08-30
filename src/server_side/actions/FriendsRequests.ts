"use server";
import connectDB from "../backend/lib/connectDB";
import Friend from "../backend/models/Friend";

export async function AddFriend(formData: FormData) {
  try {
    await connectDB();

    const from = formData.get("from") as string;
    const senderId = formData.get("senderId") as string;
    const message = formData.get("message") as string;
    const targetUserId = formData.get("targetUserId") as string;
    const status = formData.get("status") as string;
    const newFriend = new Friend({
      from,
      senderId,
      message,
      targetUserId,
      status,
    });
    await newFriend.save();

    return JSON.parse(JSON.stringify(newFriend));
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function GetFriendRequests(user_id: string) {
  try {
    await connectDB();
    const requests = await Friend.find({
      $or: [{ senderId: user_id }, { targetUserId: user_id }],
      // targetUserId: user_id,
      status: { $ne: "accepted" }, // exclude accepted requests
    });

    console.log("ALL REQUESTS (excluding accepted): ", requests);
    return JSON.parse(JSON.stringify(requests)); // ensures plain object
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function DeleteFriendRequest(senderId: string) {
  await connectDB();

  // const result = await Friend.deleteOne({
  //   senderId,
  //   targetUserId: targetId,
  // });

  const result = await Friend.deleteOne({
    c_id: senderId,
  });
  if (result.deletedCount === 0) {
    return { success: false, message: "No matching friend request found." };
  }

  return { success: true, message: "Friend request deleted successfully." };
}

export async function updateFriendRequest({
  senderId,
  targetUserId,
  action, // "accept" | "reject"
}: {
  senderId: string;
  targetUserId: string;
  action: "accepted" | "pending";
}) {
  await connectDB();

  const request = await Friend.findOne({
    $or: [
      { senderId: senderId, targetUserId: targetUserId },
      { senderId: targetUserId, targetUserId: senderId },
    ],
  });

  console.log("the data: ", senderId, targetUserId, action);

  if (!request) {
    console.log("Request Not found");
    return { message: "Request not found", status: false };
  }

  if (action === "accepted") {
    request.status = "accepted";
  } else if (action === "pending") {
    request.status = "pending";
  }

  console.log("IS Request Valid ", request);
  await request.save();

  return { message: `Friend request ${action}ed`, status: true };
}
