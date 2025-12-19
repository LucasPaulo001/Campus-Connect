import { Server, Socket } from "socket.io";
import { canUserJoinRoom } from "./canUserJoinRoom.js";

export function registerRoomHandlers(io: Server, socket: Socket) {

  socket.on("join_room", async (roomId: string) => {
    const userId = socket.data.user.id;

    const canJoin = await canUserJoinRoom(userId, roomId);

    if (!canJoin) {
      socket.emit("error", "Acesso negado à sala");
      return;
    }

    socket.join(roomId);
  });

  socket.on("leave_room", (roomId: string) => {
    socket.leave(roomId);
  });
}
