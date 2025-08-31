"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";
export default async function GetAllUsers() {
  try {
    await connectDB();
  } catch (error) {
    console.log("Your are offline", error instanceof Error && error.message);
  }
  const allUsers = await User.find().select("-password");
  const modified = allUsers.map((user) => ({
    ...user.toObject(),
    _id: user._id.toString(),
  }));

  return modified;
}
