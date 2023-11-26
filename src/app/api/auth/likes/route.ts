import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";

export async function POST(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  if (session) {
    try {
      const like = await Thread.findByIdAndUpdate(
        {
          _id: threadId,
        },
        {
          $push: {
            likes: session.sub,
          },
        }
      );

      if (like) {
        return NextResponse.json({
          status: 201,
          ok: true,
          message: "Liked successfully",
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to like thread",
        error: err instanceof Error ? err.message : null,
      });
    }
  } else {
    return NextResponse.json({
      status: 401,
      message: "You need to be authenticated to like a thread",
      ok: false,
    });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  if (session) {
    try {
      const like = await Thread.findByIdAndUpdate(
        {
          _id: threadId,
        },
        {
          $pull: {
            likes: session.sub,
          },
        }
      );

      if (like) {
        return NextResponse.json({
          status: 201,
          ok: true,
          message: "Unliked successfully",
        });
      }
    } catch (err) {
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Failed to unlike thread",
        error: err instanceof Error ? err.message : null,
      });
    }
  } else {
    return NextResponse.json({
      status: 401,
      message: "You need to be authenticated to unlike a thread",
      ok: false,
    });
  }
}
