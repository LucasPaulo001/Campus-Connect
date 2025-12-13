import { Server, Socket } from "socket.io";
import httpServer from "./http.js";
import registerNotificationHandlers from "./notifications.socket.js";

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  const userId = socket.handshake.auth.userId;

  if(!userId){
    socket.join(userId);
    console.log("Usuário conectado:", userId);
  }

  registerNotificationHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});
