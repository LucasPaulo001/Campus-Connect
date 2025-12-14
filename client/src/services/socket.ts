import { io as ClientIO, Socket } from "socket.io-client";


export const connectSocket = (userId: string | undefined): Socket => {
  return ClientIO("https://campus-connect-1-t5v9.onrender.com", {
    auth: { userId },
  });
};
