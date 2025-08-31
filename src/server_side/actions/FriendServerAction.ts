"use server";
import connectDB from "../backend/lib/connectDB";
import Conversation from "../backend/models/Conversation";
export async function AddFriendServerAction(formData: FormData) {
  try {
    await connectDB();
    console.log(formData);
    const userId = formData.get("userId") as string;
    const conversationId = formData.get("conversationId") as string;
    const otherUserId = formData.get("otherUserId") as string;
    const userFname = formData.get("userFname") as string;
    const userLname = formData.get("userLname") as string;
    const otherUserFname = formData.get("otherUserFname") as string;
    const otherUserLName = formData.get("otherUserLName") as string;
    const lastMessage = (formData.get("lastMessage") as string) || null;

    const existConvo = await Conversation.find({
      conversationId: conversationId,
    });

    if (existConvo.length >= 2) {
      return;
    }
    const newConversation = new Conversation({
      conversationId,
      userId, // this is the id of owner  of the account ( friend of mine )
      otherUserId, // this refer to the id that co related to the user schema
      userFname,
      userLname,
      otherUserFname,
      otherUserLName,
      lastMessage,
    });
    const newConversation2 = new Conversation({
      conversationId,
      otherUserId: userId, // this is the id of owner  of the account ( friend of mine )
      userId: otherUserId, // this refer to the id that co related to the user schema
      otherUserFname: userFname,
      otherUserLName: userLname,
      userFname: otherUserFname,
      userLname: otherUserLName,
      lastMessage,
    });
    await newConversation.save();
    await newConversation2.save();
    console.log("YES", newConversation);
    return JSON.parse(JSON.stringify([newConversation, newConversation2]));
  } catch (error) {
    console.error("Error:", error);
  }
}
