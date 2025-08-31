import { NextResponse } from "next/server";
import Pusher from "pusher";
import { getServerSession } from "next-auth";
import Message from "@/src/server_side/backend/models/Message";
import { authOptions } from "@/src/lib/auth";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    const {
      conversationId,
      senderId,
      recieverId,
      message,
      lastMessage,
      status,
    } = await req.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3️⃣ Save the new message with conversationId
    const newMessage = new Message({
      conversationId,
      senderId,
      recieverId,
      message,
      lastMessage,
      status,
    });

    await newMessage.save();

    // 4️⃣ Trigger Pusher for real-time updates
    await pusher.trigger(`private-user-${recieverId}`, "chat-history", {
      conversationId,
      senderId,
      recieverId,
      message,
      lastMessage,
      status,
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error in /api/message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
