import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    targetUserId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Friend = mongoose.models.Friend || mongoose.model("Friend", FriendSchema);

export default Friend;
