"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";
import {
  setRequestData,
  setSimpleNotification,
} from "@/src/redux/NotifySlicer";
import { Chat } from "@/interface/Types";
import { setLiveMessages } from "@/src/redux/chatSlicer";

export default function PusherListenerPrivate({
  user_id,
}: {
  user_id: string | null;
}) {
  const dispatch = useDispatch<ReduxDispatch>();
  const friendRequests = useSelector(
    (store: ReduxtState) => store.notify.friendRequest
  );

  useEffect(() => {
    if (!user_id) {
      console.log("No user_id, skipping Pusher setup");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-user-${user_id}`);

    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`Subscribed to private-user-${user_id}`);
    });

    channel.bind("pusher:subscription_error", (error: Chat) => {
      console.error("Subscription error:", error);
    });

    channel.bind("chat-history", (data: Chat) => {
      dispatch(setLiveMessages(data));

      // const notifiedTime: number =
      //   Date.now() + Math.floor(Math.random() * 1000000);

      // dispatch(
      //   setSimpleNotification({
      //     message: data.message,
      //     id: notifiedTime,
      //   })
      // );
    });

    return () => {
      pusher.unsubscribe(`private-user-${user_id}`);
    };
  }, [dispatch, user_id]);

  return null;
}
