import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, requred: true },
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  threads: [
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
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      followedDate: Date,
      default: [],
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      followedDate: Date,
      default: [],
    },
  ],

  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
      default: [],
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
