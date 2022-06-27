import mongoose, {mongo, Schema} from "mongoose";

const messageSchema = new Schema(
  {
    message_owner: {type: String, reqired: true},
    message_receiver: {type: String, required: true},
    message: {type: String, required: true},
  },
  {timestamps: true}
);
interface IMessage {
  message_owner: string;
  message_receiver: string;
  message: string;
}
export interface MessageDoc extends mongoose.Document {
  message_owner: string;
  message_receiver: string;
  message: string;
  createdAt?: any;
}
interface messageModelSchema extends mongoose.Model<MessageDoc> {
  build(attr: IMessage): MessageDoc;
}
messageSchema.statics.build = (attr: IMessage) => {
  return new Message(attr);
};
const Message = mongoose.model<any, messageModelSchema>(
  "Message",
  messageSchema
);
export default Message;
