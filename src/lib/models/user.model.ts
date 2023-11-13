import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, requred: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String },
  bio: { type: String },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  verified: {
    type: Boolean,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
