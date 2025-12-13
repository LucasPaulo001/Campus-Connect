import dotenv from "dotenv";
import httpServer from "./sockets/http.js";
import { initSocket } from "./sockets/socket.js"

dotenv.config();

initSocket(httpServer); 

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
