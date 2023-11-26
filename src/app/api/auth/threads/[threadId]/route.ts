import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";

type Params = {
  threadId: string;
};

export async function GET(
  req: NextRequest,
  {
    params: { threadId },
  }: {
    params: Params;
  }
) {
  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to find thread",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const thread = await Thread.findById({ _id: threadId })
      .populate([
        {
          path: "user",
          select: "username image",
        },
        {
          path: "replies",
          select: "text user createdAt replies likes isReply parentId",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "childrenThreads",
          select: "text user createdAt replies likes",
          populate: {
            path: "user",
            select: "username image",
          },
        },
      ])
      .lean();

    if (thread) {
      return NextResponse.json({
        status: 200,
        ok: true,
        data: thread,
        message: "Thread found!",
      });
    } else {
      return NextResponse.json({
        status: 404,
        ok: false,
        message: "Thread not found!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch thread!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}

export async function POST(
  req: NextRequest,
  {
    params: { threadId },
  }: {
    params: Params;
  }
) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to find thread!",
    });
  }

  const { originalThreadId, text } = await req.json();

  if (!originalThreadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields!",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  if (session) {
    try {
      const repost = await Thread.create({
        text,
        user: session.sub,
        parentId: threadId,
        isReply: false,
      });

      const addRepostToThread = await Thread.findByIdAndUpdate(
        {
          _id: threadId,
        },
        {
          $push: {
            childrenThreads: repost._id,
          },
        }
      );

      const addRepostToUser = await User.findByIdAndUpdate(
        {
          _id: session.sub,
        },
        {
          $push: {
            threads: repost._id,
          },
        }
      );

      if (repost && addRepostToThread && addRepostToUser) {
        return NextResponse.json({
          status: 201,
          ok: true,
          message: "Repost created successfully!",
        });
      }
    } catch (err) {}
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated!",
    });
  }
}
