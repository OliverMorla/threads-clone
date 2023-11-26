import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
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
      ref: "Thread",
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
  parentId: {
    type: String,
    default: null,
  },
  isReply: {
    type: Boolean,
    default: false,
  },
  childrenThreads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
