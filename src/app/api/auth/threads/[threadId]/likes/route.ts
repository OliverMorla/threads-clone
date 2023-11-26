import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";

export async function PUT(req: NextRequest) {
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
      const doesLikeExist = await Thread.find({
        _id: threadId,
        likes: {
          $in: [session.sub],
        },
      });

      console.log(doesLikeExist);

      if (doesLikeExist.length > 0){
        const removeLikeFromThread = await Thread.findByIdAndUpdate(
          {
            _id: threadId,
          },
          {
            $pull: {
              likes: session.sub,
            },
          }
        );
  
        const removeLikeFromUser = await User.findByIdAndUpdate(
          {
            _id: session.sub,
          },
          {
            $pull: {
              likes: threadId,
            },
          }
        );
  
        if (removeLikeFromThread && removeLikeFromUser) {
          return NextResponse.json({
            status: 201,
            ok: true,
            message: "Unliked successfully",
          });
        }
      }
      
      const addLikeToThread = await Thread.findByIdAndUpdate(
        {
          _id: threadId,
        },
        {
          $push: {
            likes: session.sub,
          },
        }
      );

      const addLikeToUser = await User.findByIdAndUpdate(
        {
          _id: session.sub,
        },
        {
          $push: {
            likes: threadId,
          },
        }
      );

      if (addLikeToThread && addLikeToUser) {
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
