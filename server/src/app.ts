import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./settings/db/dbConnect.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router);

dbConnect();

export default app;