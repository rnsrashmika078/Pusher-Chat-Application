import { NextResponse } from "next/server";
import Pusher from "pusher";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse URL-encoded form data
    const formData = await req.formData();
    const socket_id = formData.get("socket_id")?.toString();
    const channel_name = formData.get("channel_name")?.toString();

    if (!socket_id || !channel_name) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const auth = pusher.authorizeChannel(socket_id, channel_name, {
      user_id: session.user._id,
      user_info: { firstname: session.user.firstname },
    });

    return NextResponse.json(auth);
  } catch (error) {
    console.error("Error in /api/pusher/auth:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}