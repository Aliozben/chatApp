import {Socket} from "socket.io";

import User from "../models/UserModel";

export function socketAuth(socket: Socket, next: Function) {
  const username: string | null = socket.handshake.query
    ? (socket.handshake.query.username as string)
    : null;
  if (username) {
    User.find({username}, (err: any, result: []) => {
      if (err || result.length < 1) {
        console.log("Unautherize user disconnected");
        return next(new Error("Authentication error"));
      }
      return next();
    });
  } else {
    console.log("Unautherize user disconnected");
    next(new Error("Authentication error"));
  }
}
