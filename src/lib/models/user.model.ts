import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, requred: true, unique: true },
  name: { type: String, default: null },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: null },
  bio: { type: String, default: null },
  website: { type: String, default: null },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
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
  followers: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      followedDate: { type: String, default: Date.now },
    },
  ],
  following: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      followedDate: { type: String, default: Date.now },
    },
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  onBoarded: {
    type: Boolean,
    default: false,
  },
  activeChats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
