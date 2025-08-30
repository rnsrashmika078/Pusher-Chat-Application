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
    }); // oldest to newest

    console.log("ALL MESSAGES", chatHistory);
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
  conversationId?: string | undefined
) {
  const convId = senderId[1];

  try {
    await connectDB();
    let conversations = null;
    // Step 1: Get conversations where senderId is involved
    // if (convId) {
    //   console.log("ConversationId", convId);
    //   conversations = await Conversation.find({
    //     conversationId: convId,
    //   });
    //   console.log("conversations", conversations);
    // } else {
    conversations = await Conversation.find({
      $or: [{ userId: senderId }],
    });
    // }

    // Step 2: For each conversation, find the last message and attach it
    const conversationsWithLastMessage = await Promise.all(
      conversations.map(async (conv) => {
        const lastMsg = await Message.findOne({
          conversationId: conv.conversationId,
        })
          .sort({ createdAt: -1 }) // assuming messages have a createdAt field
          .select("lastMessage"); // only get the lastMessage field

        return {
          ...conv.toObject(), // convert Mongoose doc to plain JS object
          lastMessage: lastMsg?.lastMessage || null,
        };
      })
    );

    console.log("Conversation", conversationsWithLastMessage);
    console.log("sender Id ", senderId);
    // console.log("raw convesations", conversations);

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
