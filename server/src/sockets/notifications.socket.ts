import { Server, Socket } from "socket.io";

export default function registerNotificationHandlers(io: Server, socket: Socket) {

    socket.on("notify", (data) => { 
        if (!data?.type) return
        console.log("Nova notificação", data);
        io.emit("notification", {
            ...data,
            createdAt: new Date()
        });
    });

}