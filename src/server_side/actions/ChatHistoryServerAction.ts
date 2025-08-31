"use server";
import connectDB from "../backend/lib/connectDB";
import Conversation from "../backend/models/Conversation";
import Message from "../backend/models/Message";
export async function getChatHistory(
  userid: string | undefined,
  conversationId?: string | undefined
) {
  try {
    await connectDB();

    const chatHistory = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    return {
      data: JSON.parse(JSON.stringify(chatHistory)),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}
export async function getChats(
  senderId: string,
) {

  try {
    await connectDB();
    let conversations = null;
    conversations = await Conversation.find({
      $or: [{ userId: senderId }],
    });

    const conversationsWithLastMessage = await Promise.all(
      conversations.map(async (conv) => {
        const lastMsg = await Message.findOne({
          conversationId: conv.conversationId,
        })
          .sort({ createdAt: -1 }) 
          .select("lastMessage");

        return {
          ...conv.toObject(), 
          lastMessage: lastMsg?.lastMessage || null,
        };
      })
    );
    return {
      data: JSON.parse(JSON.stringify(conversationsWithLastMessage)),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}
