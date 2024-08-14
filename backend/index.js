import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ingredientsRouter from "./routes/ingredients.js";
import process from "process";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
console.log("PORT", port);

const allowedOrigins = [
  "http://localhost:5173",
  "https://kitchenck-frontend-jenarus-projects.vercel.app",
  "https://kitchenck-frontend-jenaru-jenarus-projects.vercel.app",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.options("*", cors()); // Asegura que las solicitudes OPTIONS sean manejadas correctamente

app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

connectDB();

app.use("/api/ingredients", ingredientsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
