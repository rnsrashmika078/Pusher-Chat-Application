import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      // this is my id equals to sender id
      type: String,
      required: true,
    },
    otherUserId: {
      // this is friend id equals to reciever id
      type: String,
      required: true,
    },
    userFname: {
      type: String,
      required: true,
    },
    userLname: {
      type: String,
      required: true,
    },
    otherUserFname: {
      type: String,
      required: true,
    },
    otherUserLName: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
  },
  { timestamps: true }
);

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);

export default Conversation;
