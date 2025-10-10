"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { Member } from "@/interface/Types";
import {
  joinedUser,
  leftUser,
  setGroupLiveMessage,
  setOnlineUsers,
  setPusherChannel,
  setSeenMessageStatus,
} from "@/src/redux/chatSlicer";
import { ReduxDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { updateLastSeen } from "@/src/server_side/actions/UserLastSeenServerAction";
import { GroupMessage } from "@/src/types";

type MessageType = {
  from: string;
  senderId: string;
  message: string;
  targetUserId: string;
};
export default function PusherPresenceGroup({
  user_id,
}: {
  user_id: string | undefined;
}) {
  const dispatch = useDispatch<ReduxDispatch>();
  useEffect(() => {
    if (!user_id) {
      return;
    }
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });
    const presenceChannel = pusher.subscribe("presence-group");
    // const channel = pusher.subscribe(`presence-user-${user_id}`);
    // const privateChannel = pusher.subscribe(`private-chat-${user_id}`);
    if (!presenceChannel) {
      return;
    }
    dispatch(setPusherChannel(presenceChannel));
    presenceChannel.bind(
      "pusher:subscription_succeeded",
      (members: { members: Record<string, Member["info"]> }) => {
        const initialMembers = Object.entries(members.members).map(
          ([id, info]) => ({
            id,
            info,
          })
        );
        dispatch(setOnlineUsers(initialMembers));
      }
    );
    presenceChannel.bind("pusher:member_added", (member: Member) => {
      dispatch(joinedUser(member));
    });
    presenceChannel.bind("pusher:member_removed", async (member: Member) => {
      dispatch(leftUser(member));
      await updateLastSeen(member.id);
    });
    presenceChannel.bind("pusher:subscription_error", (error: MessageType) => {
      console.log(error instanceof Error ? error.message : undefined);
    });
    presenceChannel.bind("group-chat-history", (data: GroupMessage) => {
      dispatch(setGroupLiveMessage(data));
    });
    presenceChannel.bind(
      "seen-message",
      (data: { messageId: string; conversationId: string; seen: boolean }) => {
        dispatch(setSeenMessageStatus(data));
      }
    );
    return () => {
      pusher.unsubscribe(`presence-group`);
      pusher.disconnect();
    };
  }, [dispatch, user_id]);

  return null;
}
