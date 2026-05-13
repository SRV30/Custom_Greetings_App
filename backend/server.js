import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server Running");
    });
  })
  .catch((err) => console.log(err));
