"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";

export default async function SignWithGoogle(formData: FormData) {
  await connectDB();

  console.log("Form data comes to BE", formData);

  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const profileimage = formData.get("profileimage") as string;

  const user = await User.findOne({ username });

  if (user) {
    console.log("User already exists in DB", user);
    return user;
  }

  const newUser = new User({
    username,
    firstname,
    lastname,
    email,
    profileimage,
  });
  console.log("New User ", newUser);
  await newUser.save();

  return newUser;
}
