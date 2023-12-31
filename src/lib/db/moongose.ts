import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return console.log("=> Connection already exists");
  }

  if (!process.env.MONGODB_URI) {
    return console.log("=> MONGODB_CONNECTION_STRING is not defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("=> Connected to database");
  } catch (err) {
    console.log(
      "=> Error connecting to database:",
      err instanceof Error && err.message
    );
  }
};
