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

    const newFriend = new Friend({
      from,
      senderId,
      message,
      targetUserId,
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
    const requests = await Friend.find({ targetUserId: user_id });

    console.log("ALL REQUESTS: ", requests);
    return JSON.parse(JSON.stringify(requests)); // ensures plain object
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}
