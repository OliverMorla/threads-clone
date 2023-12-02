import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  createdAt: {
    Type: Date,
    default: Date.now, 
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
