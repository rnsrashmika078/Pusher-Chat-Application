"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";
export default async function GetAllUsers() {
  await connectDB();
  const allUsers = await User.find();
  const modified = allUsers.map((user) => ({
    ...user.toObject(),
    _id: user._id.toString(),
  }));

  return modified;
}
