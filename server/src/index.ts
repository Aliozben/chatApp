// mongo username:username pass:oOxOF0ig8GKj9rYZ

import Http from "http";
import {Server} from "socket.io";

import connectMongo from "./configs/mongoConfig";
import socketIO from "./configs/socketioConfig";

export const server = Http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

connectMongo();

socketIO(io);

server.listen(9001, () => {
  console.log("server is running on 9001");
});
