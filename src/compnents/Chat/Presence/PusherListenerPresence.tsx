"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { Chat, Member } from "@/interface/Types";
import {
  joinedUser,
  leftUser,
  setLiveMessages,
  setOnlineUsers,
  setPusherChannel,
  setSeenMessageStatus,
} from "@/src/redux/chatSlicer";
import { ReduxDispatch } from "@/src/redux/store";
import { useDispatch } from "react-redux";
import { updateLastSeen } from "@/src/server_side/actions/UserLastSeenServerAction";

type MessageType = {
  from: string;
  senderId: string;
  message: string;
  targetUserId: string;
};

export default function PusherListenerPresence({
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

    const presenceChannel = pusher.subscribe("presence-users");
    const channel = pusher.subscribe(`presence-user-${user_id}`);
    const privateChannel = pusher.subscribe(`private-chat-${user_id}`);

    if (!presenceChannel || !channel) {
      return;
    }
    dispatch(setPusherChannel(privateChannel));
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

    channel.bind("pusher:subscription_error", (error: MessageType) => {
      console.log(error instanceof Error ? error.message : undefined);
    });

    channel.bind("chat-history", (data: Chat) => {
      dispatch(setLiveMessages(data));
    });

    privateChannel.bind(
      "seen-message",
      (data: { messageId: string; conversationId: string; seen: boolean }) => {
        dispatch(setSeenMessageStatus(data));
      }
    );
    return () => {
      pusher.unsubscribe(`presence-user-${user_id}`);
      pusher.disconnect();
    };
  }, [dispatch, user_id]);

  return null;
}
