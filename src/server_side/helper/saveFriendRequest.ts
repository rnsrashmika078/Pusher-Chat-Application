import connectDB from "../backend/lib/connectDB";
import Friend from "../backend/models/Friend";

// lib/saveFriendRequest.ts
export async function saveFriendRequest({
  from,
  senderId,
  message,
  targetUserId,
  status,
  c_id,
}: {
  c_id: string;
  from: string;
  senderId: string;
  message: string;
  targetUserId: string;
  status: string;
}) {
  await connectDB(); // Ensure DB is connected

  // check the friend request already exists
  const existingRequest = await Friend.findOne({
    $or: [
      { senderId: senderId, targetUserId: targetUserId },
      { senderId: targetUserId, targetUserId: senderId },
    ],
    status: { $in: ["pending", "accepted"] },
  });
  if (existingRequest) {
    return { message: "Friend request already exists", success: false };
  }
  // Create a new friend request
  await Friend.create({
    c_id,
    from,
    senderId,
    message,
    targetUserId,
    status,
  });
}
