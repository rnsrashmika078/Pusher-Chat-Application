"use client";
import Button from "@/src/lib/Components/Basic/Button";
import { ReduxDispatch, ReduxtState } from "@/src/redux/store";

import { friendRequestFetcher } from "@/src/utils/friendRequestFetcher";
import { useSession } from "next-auth/react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

// interface NotificationProps {
//   storeRequests: FriendRequest[];
// }
const ShowNotification: React.FC = () => {
  const liveRequest = useSelector(
    (store: ReduxtState) => store.notify.friendRequest
  );

  const { data: session } = useSession();
  const { data: friendRequests, mutate } = useSWR(
    session?.user._id,
    friendRequestFetcher
    // {
    //   revalidateOnFocus: true, // refetch when window/tab gets focus
    //   revalidateOnReconnect: true, // refetch on reconnect
    //   shouldRetryOnError: false, // don’t
    // }
  );

  const dispatch = useDispatch<ReduxDispatch>();
  const handleDeleteRequest = async (sender: string) => {
    alert(sender);
    if (!friendRequests) return;

    try {
      // Optimistic update: remove request immediately

      // Call API to delete
      const response = await DeleteFriendRequest(sender);
    
      mutate(
        friendRequests.filter((req: FriendRequest) => !(req.c_id !== sender)),
        false
      );

      // dispatch(removeFriendRequest({ c_id: sender }));
      // Optional: re-fetch to make sure server state is synced
      // mutate();
    } catch (err) {
      console.error("Delete failed:", err);
      // rollback
      mutate();
    }
  };

  const handleAcceptRequest = async (
    senderId: string,
    targetUserId: string
  ) => {
    alert(JSON.stringify(senderId + " " + targetUserId));
    try {
      // ✅ Optimistically remove from SWR cache instantly
      mutate(
        friendRequests?.map((req: FriendRequest) =>
          req.senderId === senderId && req.targetUserId === targetUserId
            ? { ...req, status: "accepted" }
            : req
        ),
        false // don't revalidate yet
      );
      // dispatch(removeFriendRequest({ c_id: senderId }));
      // 🔥 Call API
      const response = await updateFriendRequest({
        senderId,
        targetUserId,
        action: "accepted",
      });

      if (response.status) {
        // optional: revalidate to confirm backend state
        // mutate();
      } else {
        console.warn(response.message);
        // ❌ rollback: fetch latest from server
        mutate();
      }
    } catch (error) {
      console.error("Error while accepting request:", error);
      // ❌ rollback: refetch from backend
      mutate();
    }
  };

  const requests =
    liveRequest && liveRequest?.length > 0 ? liveRequest : friendRequests;


  return (
    <div className="p-5">
      {session &&requests &&
        requests
          .filter((req: FriendRequest) => req.status !== "accepted")
          // .filter((req: FriendRequest) => req.senderId !== session?.user._id)

          .map((req: FriendRequest, index: number) => (
            // req.senderId !== session?.user._id?  (
            <div
              key={index}
              className="bg-white p-2 border border-gray-200 rounded-xl"
            >
              {/* <h1>
                {req.message.split(req.from)[0]}{" "}
                <span className="font-bold">{req.from}</span>
              </h1> */}
              <div className="flex gap-2">
                <Button
                  name={"Accept"}
                  size="xs"
                  // disabled={accepted}
                  variant="default"
                  radius="xl"
                  onClick={() =>
                    handleAcceptRequest(req.senderId, req.targetUserId || "")
                  }
                />
                <Button
                  name="Delete"
                  variant="windows"
                  size="xs"
                  radius="xl"
                  onClick={() => handleDeleteRequest(req.c_id || "")}
                />
              </div>
            </div>
          ))
        }
    </div>
  );
};

export default ShowNotification;
