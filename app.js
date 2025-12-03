import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import contactRoute from "./src/routes/contact.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// CONNECT DB
connectDB();

// ROUTES
app.use("/api/contact", contactRoute);

// SERVER
app.listen(5000, () => {
  console.log("🚀 Backend running on port 5000");
});

export default app;
