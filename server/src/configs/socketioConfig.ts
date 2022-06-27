import {Socket, Server} from "socket.io";

import {socketAuth} from "../middlewares/AuthMiddleware";
import {removeActiveUser, setActiveUser} from "../controllers/UserController";
import {
  getUnreceivedMessages,
  sendDataToAllFriends,
} from "../controllers/ChatController";
import {EMIT_TYPES} from "../constants/socketioConstants";
import {socketSendMessageToAllFriends} from "../controllers/SocketController";

export const socketIO = (io: Server) => {
  io.use((socket, next) => socketAuth(socket, next)).on(
    "connection",
    async (socket: Socket) => {
      const username = socket.handshake.query.username as string;
      console.log(socket.id, "connected");

      setActiveUser(username, socket.id);
      socket.emit(
        EMIT_TYPES.GET_OLD_MESSAGES,
        await getUnreceivedMessages(username)
      );
      sendDataToAllFriends(username, socket, "friend-login");

      socketSendMessageToAllFriends(username, socket);

      socket.on("disconnecting", () => {
        sendDataToAllFriends(username, socket, "friend-logof");
        removeActiveUser(username);
      });
    }
  );
};
export default socketIO;
