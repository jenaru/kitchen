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
  "https://kitchenck-frontend.vercel.app/",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite solicitudes sin origen (como aplicaciones móviles o curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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
