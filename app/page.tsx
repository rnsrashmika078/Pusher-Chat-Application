import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

// Mock function to get all users (replace with your actual implementation)
export default async function Home() {
  const session = await getServerSession(authOptions);
  // const allUsers = await GetAllUsers();

  if (!session) {
    return <div className="p-5">Please log in to view this page.</div>;
  }

  return (
    <div>
    </div>
  );
}
