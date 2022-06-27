import {Socket} from "socket.io";
import MessageModel from "../models/MessageModel";
import {getActiveUserSocketId, getFriendlist} from "./UserController";

type emitType = "friend-login" | "new-message" | "friend-logof";

export const sendDataToAllFriends = async (
  username: string,
  socket: Socket,
  emitType: emitType,
  data?: {
    message: string;
  }
) => {
  const friendList = await getFriendlist(username);
  if (!friendList || friendList.length < 1) return null;
  friendList.forEach(async friend => {
    const friendSocketId = await getActiveUserSocketId(friend);
    if (emitType === "new-message" && friendSocketId === null && data) {
      saveUnreceivedMessage(username, friend, data.message);
    } else if (friendSocketId) {
      socket.to(friendSocketId).emit(emitType.toString(), {username, data});
    }
  });
};

const saveUnreceivedMessage = (
  username: string,
  friendName: string,
  message: string
) => {
  MessageModel.build({
    message_owner: username,
    message_receiver: friendName,
    message,
  }).save();
};

export const getUnreceivedMessages = async (username: string) => {
  const messages = await MessageModel.find({message_receiver: username});
  MessageModel.deleteMany({message_receiver: username});
  return messages.map(mes => {
    return {message: mes.message, owner: mes.message_owner};
  });
};
