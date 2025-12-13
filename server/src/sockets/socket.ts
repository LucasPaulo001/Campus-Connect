
import { Server, Socket } from "socket.io";
import registerNotificationHandlers from "./notifications.socket.js";

let io: Server;

export function initSocket(httpServer: any) {
  io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.auth.userId;
    if (userId) {
      socket.join(userId);
      console.log("Usuário conectado:", userId);
    }
    registerNotificationHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });
}

export { io };
