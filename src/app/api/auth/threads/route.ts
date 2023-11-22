import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";

// get a thread
export async function GET(req: NextRequest) {
  await connectToDatabase();
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
}

// create a new thread
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { text, image } = await req.json();

  if (!text) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (user) {
    try {
      const thread = await Thread.create({
        text,
        user: user.sub,
        image: image || null,
      });

      const userWithThread = await User.findByIdAndUpdate(
        {
          _id: user.sub,
        },
        {
          $push: {
            threads: thread._id,
          },
        }
      );

      if (thread && userWithThread) {
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

// edit a thread
export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });
}

// delete a thread
export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (session) {
    try {
      const thread = await Thread.findOneAndDelete({
        _id: threadId,
      });

      if (thread) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Thread deleted successfully",
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
