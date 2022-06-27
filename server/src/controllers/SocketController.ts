import {Socket} from "socket.io";
import {EMIT_TYPES} from "../constants/socketioConstants";
import {sendDataToAllFriends} from "./ChatController";

export const socketSendMessageToAllFriends = (
  username: string,
  socket: Socket
) => {
  socket.on(EMIT_TYPES.NEW_MESSAGE, data => {
    console.log(data);
    sendDataToAllFriends(username, socket, "new-message", {
      message: data.message,
    });
  });
};
