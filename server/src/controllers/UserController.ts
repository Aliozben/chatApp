import redisClient from "../configs/redisConfig";
import FriendList from "../models/FriendListModel";
import User from "../models/UserModel";

export const getFriendlist = async (username: string) => {
  const friends = await FriendList.find({username});
  if (friends.length === 0) return;

  return friends[0].friend_usernames;
};
export const getUserId = async (username: string) => {
  const user = await User.find({username});
  if (user.length == 1) return user[0]._id;
};
export const getActiveUserSocketId = async (username: string) => {
  return redisClient.get(`user:${username}`);
};

export const setActiveUser = async (username: string, socketId: string) => {
  redisClient.set(`user:${username}`, socketId);
};

export const removeActiveUser = async (username: string) => {
  return redisClient.del(`user:${username}`);
};
