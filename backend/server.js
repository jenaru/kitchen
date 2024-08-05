/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
import ingredientsRouter from "./routes/ingredients.js";

dotenv.config(); // Utilizar dotenv para cargar variables de entorno

const app = express();
const port = process.env.PORT || 5000;
console.log("PORT", port);

app.use(cors());
app.use(express.json());

//console.log(process.env.MONGODB_URI);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      ssl: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
}

connectDB();

app.use("/api/ingredients", ingredientsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
