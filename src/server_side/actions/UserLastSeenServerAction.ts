"use server";
import connectDB from "../backend/lib/connectDB";
import User from "../backend/models/User";
export async function updateLastSeen(userid: string | undefined) {
  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { _id: userid },
      { lastSeen: new Date() },
      { new: true }
    )
      .select("_id lastSeen")
      .lean();

    if (!user) return;
    return {
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}
export async function getLastSeen(userid: string | undefined) {
  try {
    await connectDB();

    const user = await User.findOne({ _id: userid }).select("_id lastSeen");

    if (!user) return;
    return {
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    return {
      data: [],
      error: error,
    };
  }
}
