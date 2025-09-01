import { updateMessageStatus } from "@/src/server_side/actions/ChatHistoryServerAction";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversationId, messageId, senderId } = body;

    if (!conversationId || !messageId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await updateMessageStatus(conversationId, "seen");
    await pusher.trigger(`private-chat-${senderId}`, "seen-message", {
      messageId,
      conversationId,
      seen: true,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Seen message error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
