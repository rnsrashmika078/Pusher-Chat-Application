"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";

import bcrypt from "bcrypt";
// @ts-ignore
export default async function UserSignIn({ username, password }) {
    await connectDB();
    const user = await User.findOne({ username: username });
    if (!user) return null;

    if (!username || !password) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
    };
}
