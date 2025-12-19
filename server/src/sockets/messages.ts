import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { canUserJoinRoom } from "./canUserJoinRoom.js";

export function registerMessageHandlers(io: Server, socket: Socket) {

  socket.on("send_message", async (data) => {
    const user = socket.data.user;

    if (!data?.roomId || !data?.content) return;
    if (data.content.length > 1000) return;

    const canSend = await canUserJoinRoom(user.id, data.roomId);
    if (!canSend) return;

    const message = {
      id: crypto.randomUUID(),
      roomId: data.roomId,
      senderId: user.id,
      content: data.content,
      createdAt: new Date(),
    };

    // mensagem em tempo real
    io.to(data.roomId).emit("new_message", message);

    // notificação 
    io.emit("notification", {
      type: "NEW_MESSAGE",
      roomId: data.roomId,
      from: user.id,
      createdAt: new Date(),
    });
  });
}
