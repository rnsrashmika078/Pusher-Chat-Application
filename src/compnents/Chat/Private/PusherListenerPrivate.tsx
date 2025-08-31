"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { ReduxDispatch } from "@/src/redux/store";
import { Chat } from "@/interface/Types";
import { setLiveMessages } from "@/src/redux/chatSlicer";

export default function PusherListenerPrivate({
  user_id,
}: {
  user_id: string | null;
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

    const channel = pusher.subscribe(`private-user-${user_id}`);

    channel.bind("pusher:subscription_succeeded", () => {});

    channel.bind("pusher:subscription_error", (error: Chat) => {
      console.log(error instanceof Error ? error.message : undefined);
    });

    channel.bind("chat-history", (data: Chat) => {
      dispatch(setLiveMessages(data));
    });

    return () => {
      pusher.unsubscribe(`private-user-${user_id}`);
    };
  }, [dispatch, user_id]);

  return null;
}
