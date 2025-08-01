import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DB,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    // @ts-ignore
    console.log("❌ MongoDB connection failed:", err.message);
    // Optional: avoid throwing to prevent app crash
  }
};

export default connectDB;
