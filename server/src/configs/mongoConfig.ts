import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://username:oOxOF0ig8GKj9rYZ@cluster0.sdptd2g.mongodb.net/?retryWrites=true&w=majority"
);

const connectMongo = () => mongoose.connection;
connectMongo().on("error", console.error.bind(console, "Mongo connection error: "));
connectMongo().once("open", function () {
  console.log("Connected to MongoDB successfully");
});

export default connectMongo;
