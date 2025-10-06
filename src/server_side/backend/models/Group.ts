import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    groupMembers: [
      { userId: { type: String, required: true } },
      {
        firstName: { type: String, required: true },
      },
      { lastName: { type: String, required: true } },
    ],
    message: [
      {
        senderId: {
          type: String,
          required: false,
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
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Group = mongoose.models.Group || mongoose.model("Group", GroupSchema);

export default Group;
