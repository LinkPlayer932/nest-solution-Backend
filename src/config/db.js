import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "nest-solution"
    });
    console.log("⚡ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
};

export default connectDB;
