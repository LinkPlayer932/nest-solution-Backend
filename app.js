import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import articleRoutes from "./src/routes/articles.js";
import contactRoutes from "./src/routes/contact.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

// ❗IMPORTANT: JSON + urlencoded both allow
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


// Routes
app.use("/api/articles", articleRoutes);
app.use("/api/contact", contactRoutes);

// ⭐ GLOBAL ERROR HANDLER — REAL ERRORS SHOW HONGE
app.use((err, req, res, next) => {
  console.log("🔥 GLOBAL ERROR:", JSON.stringify(err, null, 2));
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
