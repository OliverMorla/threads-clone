import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import User from "@/lib/models/user.model";
import Thread from "@/lib/models/thread.model";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { originalThreadId, text, image } = await req.json();

  if (!text) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (user) {
    try {
      // create reply/thread
      const thread = await Thread.create({
        text,
        user: user.sub,
        image: image || null,
      });
      
      // add thread to user
      const addReplyToThread = await Thread.findByIdAndUpdate(
        {
          _id: originalThreadId,
        },
        {
          $push: {
            replies: thread._id,
          },
        }
      );

      // add reply to user
      const addReplyToUser = await User.findByIdAndUpdate(
        {
          _id: user.sub,
        },
        {
          $push: {
            replies: thread._id,
          },
        }
      );

      if (thread && addReplyToThread && addReplyToUser) {
        return NextResponse.json({
          status: 201,
          ok: true,
          message: "Thread created successfully",
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Something went wrong",
        error: err instanceof Error ? err.message : null,
      });
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }
}
