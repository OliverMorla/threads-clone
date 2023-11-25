// Not used at the moment

import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  text: { type: String, requred: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  childrenThreads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
});

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

export default Reply;
