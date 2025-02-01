import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import urlRoutes from "./routes/url.routes";
import { redirectUrl } from "./controllers/url.controller";

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/v1/api/auth", authRoutes);
app.use("/", urlRoutes);

export default app;
