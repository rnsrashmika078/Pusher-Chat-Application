import { NextResponse } from "next/server";
import Pusher from "pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    const { message, targetUserId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await pusher.trigger(`presence-users`, "friend-request", {
      from: session.user.firstname,
      senderId: session.user._id,
      message,
      targetUserId,
    });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Error in /api/message:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
