import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    myId: {
      type: String,
      required: true,
    },
    profileimage: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // ✅ this should be the *second argument*
  }
);

const Friend = mongoose.models.Friend || mongoose.model("Friend", FriendSchema);

export default Friend;
