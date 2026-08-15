import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./settings/db/dbConnect.js";
import router from "./routes/router.js";
import dns from "dns/promises";
import cookieParser from "cookie-parser";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

dbConnect();

export default app;