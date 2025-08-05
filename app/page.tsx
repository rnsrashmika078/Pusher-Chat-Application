import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SendRequestButton from "@/src/compnents/Chat/SendRequestButton";
import GetAllUsers from "@/src/server_side/actions/GetAllUsers";
import SignOutButton_ClientSide from "@/src/lib/Components/Basic/SignOutButton_ClientSide";
import PusherListenerPrivate from "@/src/compnents/Chat/Private/PusherListenerPrivate";
import PusherListenerPresence from "@/src/compnents/Chat/Presence/PusherListenerPresence";
import Sonner from "@/src/compnents/Sonner/Sonner";
import Chat from "@/src/compnents/Chat/Chat";
import ProgressBar from "@/src/lib/Components/Basic/ProgressBar";

// Mock function to get all users (replace with your actual implementation)
export default async function Home() {
  const session = await getServerSession(authOptions);
  // const allUsers = await GetAllUsers();

  if (!session) {
    return <div className="p-5">Please log in to view this page.</div>;
  }

  return (
    <div>
   
      {/* <PusherListenerPrivate user_id={session.user._id} />
      <SignOutButton_ClientSide />
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {session.user.firstname} {session.user.lastname}
      </h1>
      <h2 className="text-lg mb-4">Your ID: {session.user._id}</h2>
      <h3 className="text-xl font-semibold mb-2">Users</h3>
      
      <ul className="space-y-4">
        {allUsers
          .filter((user) => user._id !== session.user._id)
          .map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded"
            >
              <span>
                ID: {user._id} | Username: {user.lastname}
              </span>
              <SendRequestButton targetId={user._id} />
            </li>
          ))}
      </ul> */}
      {/* <Chat /> */}
      {/* <Email /> */}
    </div>
  );
}
