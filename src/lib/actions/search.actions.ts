"use server";

import { connectToDatabase } from "@/lib/db/moongose";
import User from "../models/user.model";

// get all users
export async function fetchUsers(
  limit: number,
  { username }: { username: string }
) {
  try {
    await connectToDatabase().catch((err) => {
      console.log(err instanceof Error && err.message);
    });

    const regex = new RegExp(username, "i");

    const users = await User.find()
      .select("username image")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .regex("username", regex);

    return users;
  } catch (err) {}
}
