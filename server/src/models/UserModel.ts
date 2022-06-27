import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});
interface IUser {
  username: string;
  password: string;
}
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
}
interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}
userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};
const User = mongoose.model<any, userModelInterface>("User", userSchema);
export default User;
