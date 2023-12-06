import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";
import Thread from "@/lib/models/thread.model";

export async function GET(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (session) {
    await connectToDatabase();
    const user = await User.findById(session.sub).populate({
      path: "bookmarks",
      populate: {
        path: "user",
        select: "username image",
      },
    });

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "User bookmarks fetched successfully",
        data: user.bookmarks,
      });
    } else {
      return NextResponse.json({
        status: 404,
        ok: false,
        message: "User not found",
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

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (user) {
    try {
      const doesItExist = await User.findOne({
        bookmarks: {
          $in: [threadId],
        },
      });

      if (doesItExist) {
        return NextResponse.json({
          status: 404,
          ok: false,
          message: "Thread is already bookmarked",
        });
      }

      const bookmark = await User.findOneAndUpdate(
        {
          _id: user.sub,
        },
        {
          $push: { bookmarks: threadId },
        }
      );

      if (bookmark) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Thread bookmarked successfully",
        });
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({
        status: 500,
        ok: false,
        message: "Something  went wrong",
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

export async function DELETE(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (!session) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err);
  });

  const { threadId } = await req.json();

  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  try {
    const doesItExist = await User.findOne({
      bookmarks: {
        $in: [threadId],
      },
    });

    if (!doesItExist) {
      return NextResponse.json({
        status: 404,
        ok: false,
        message: "Thread is not bookmarked",
      });
    }

    const bookmark = await User.findOneAndUpdate(
      {
        _id: session.sub,
      },
      {
        $pull: {
          bookmarks: threadId,
        },
      }
    );

    if (bookmark) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Thread unbookmarked successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Something  went wrong",
      error: err instanceof Error ? err.message : null,
    });
  }
}
