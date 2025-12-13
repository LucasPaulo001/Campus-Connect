import dotenv from "dotenv";
import httpServer from "./sockets/http.js";
import "./sockets/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
