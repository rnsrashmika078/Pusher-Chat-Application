"use server";
import { EmailType } from "@/src/types";
import connectDB from "../backend/lib/connectDB";
import Email from "../backend/models/Email";

export async function GetEmails(): Promise<EmailType[]> {
  try {
    await connectDB();
    const emails = await Email.find().sort({ createdAt: -1 }).lean();
    // Convert _id to string for each email
    // @ts-ignore
    return emails.map((email) => ({
      ...email,
      // @ts-ignore
      _id: email._id.toString(), // Convert ObjectId to string
    }));
  } catch (error) {
    console.error("DB fetch error:", error);
    return [];
  }
}
