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
    },
  ],
  verified: {
    type: Boolean,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
