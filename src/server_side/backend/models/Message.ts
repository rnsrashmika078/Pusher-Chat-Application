import mongoose from "mongoose";

// Message schema
const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
    message: {
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

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
