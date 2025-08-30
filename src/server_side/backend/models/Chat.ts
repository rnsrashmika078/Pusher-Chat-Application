import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: false,
    },
    recieverId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
      required: false,
    },
  },
  {
    timestamps: true, // ✅ this should be the *second argument*
  }
);

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
