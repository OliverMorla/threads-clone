import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: { type: String, requred: true, unique: true },
  
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
