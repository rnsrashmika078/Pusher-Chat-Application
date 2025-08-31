"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";
import bcrypt from "bcrypt";

export default async function UserSignIn({ username, password }) {
  await connectDB();
  const user = await User.findOne({ username: username });
  if (!user) return null;

  if (!username || !password) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    _id: user._id.toString(),
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    profileImage: user.profileImage,
    coverImage: user.coverImage,
  };
}
