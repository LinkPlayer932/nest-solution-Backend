// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// connectDB().then(async()=>{
//     console.log("Connected to DB");
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./route/contactroutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
// Tumhara frontend fetch URL ke liye correct route ye hai:
// POST http://localhost:5000/api/contact
app.use("/api/contact", contactRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

