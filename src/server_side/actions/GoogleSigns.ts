"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";

export default async function SignWithGoogle(formData: FormData) {
  await connectDB();


  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const profileimage = formData.get("profileimage") as string;

  const user = await User.findOne({ username });

  if (user) {
    return user;
  }

  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    profileimage,
  });
  await newUser.save();

  return newUser;
}
