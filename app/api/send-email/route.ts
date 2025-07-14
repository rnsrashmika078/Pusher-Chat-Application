import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Email from "@/src/server_side/backend/models/Email";
export async function POST(request: Request) {
  try {
    const { from, to, subject, html, body, header } = await request.json(); // get content from request

    // const emailData = { from, to, subject, header, body, html };

    await Email.create({ body, html, header, subject, to, from }); // ✅ also valid

    // console.log("FROM SAVE SERVER ACTION", newEmail);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
