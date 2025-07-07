import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    return mongoose.connect(process.env.MONGODB_URI!, {
        dbName: `${process.env.MONGODB_DB}`,
    });
};

export default connectDB;
