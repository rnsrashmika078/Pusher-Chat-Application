import { NextResponse } from "next/server";
import Pusher from "pusher";
import connectDB from "@/src/server_side/backend/lib/connectDB";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    await connectDB();

    // let saved = true;
    const { userMessage } = await req.json();


    // const saveContact = await Conversation.find({
    //   conversationId,
    //   userid: senderId,
    // });
    // if (saveContact.length === 0) {
    //   saved = false;
    // }
    // const newMessage = new Message({
    //   conversationId,
    //   senderId,
    //   recieverId,
    //   message,
    //   lastMessage,
    //   status,
    // });

    // await newMessage.save();
    // 4️⃣ Trigger Pusher for real-time updates
    await pusher.trigger(`presence-group`, "group-chat-history", userMessage);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error in /api/message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
