"use server";
import { IContent } from "@/src/types";
import connectDB from "../backend/lib/connectDB";
export default async function SendEmail(content: IContent) {
  await connectDB();
  await fetch("http://localhost:3000/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: content?.from,
      to: content?.to,
      subject: content?.subject,
      header: content?.header,
      body: content?.body,
      html: `<h1>${content?.header}</h1><p>${content?.body}.</p>`,
    }),
  });
}
