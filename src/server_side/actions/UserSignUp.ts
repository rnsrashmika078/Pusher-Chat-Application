"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";
import bcrypt from "bcrypt";
export default async function UserSignUp(formData: FormData) {
    await connectDB();
    const username = formData.get("username");
    const password = formData.get("password");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");

    const user = await User.findOne({ username });

    if (!user) {
        const hashedPassword = await bcrypt.hash(password as string, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            firstname,
            lastname,
        });
        await newUser.save(newUser);
        return {
            message:
                "New User Created.You have successfully signup.!",
            status: 200,
            username,
        };
    }
    if (user) {
        return {
            status: 401,
            message:
                "Username is Already taken.Choose new username and try again!",
        };
    }
}
