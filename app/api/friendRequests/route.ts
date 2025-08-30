import connectDB from "@/src/server_side/backend/lib/connectDB";
import Friend from "@/src/server_side/backend/models/Friend";

export async function DELETE(request: Request) {
  const { senderId, targetUserId } = await request.json();
  await connectDB();

  const result = await Friend.deleteOne({
    senderId,
    targetUserId
  });

  if (result.deletedCount === 0) {
    return { success: false, message: "No matching friend request found." };
  }

  return { success: true, message: "Friend request deleted successfully." };
}
