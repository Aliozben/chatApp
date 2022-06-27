import mongoose, {mongo, Schema} from "mongoose";

const friendListSchema = new Schema({
  username: {type: String, required: true},
  friend_usernames: {type: []},
});
interface IFriendList {
  username: string;
  friend_usernames: string[];
}
interface FriendListDoc extends mongoose.Document {
  username: string;
  friend_usernames: string[];
}
interface friendListModelInterface extends mongoose.Model<FriendListDoc> {
  build(attr: IFriendList): FriendListDoc;
}
friendListSchema.statics.build = (attr: IFriendList) => {
  return new FriendListModel(attr);
};
const FriendListModel = mongoose.model<any, friendListModelInterface>(
  "FriendListModel",
  friendListSchema
);
export default FriendListModel;
