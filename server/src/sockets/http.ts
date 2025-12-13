import http from "http";
import app from "../app.js";

const httpServer = http.createServer(app);

export default httpServer