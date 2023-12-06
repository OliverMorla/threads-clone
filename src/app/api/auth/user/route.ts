import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/db/moongose";
import User from "@/lib/models/user.model";

// get current user session
export async function GET(req: NextRequest) {
  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  const session = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authorized",
    });
  }

  try {
    const user = await User.findById(session.sub)
      .select({ password: 0 })
      .populate([
        {
          path: "threads",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "likes",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "replies",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "followers._id",
          select: "username image",
        },
        {
          path: "following._id",
          select: "username image",
        },
      ]);

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        data: user,
        message: "User session found!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user session!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}

// get user by username
export async function POST(req: NextRequest) {
  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  const session = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  const { username, userId } = await req.json();

  console.log(username, userId);

  // if (!username || !userId) {
  //   return NextResponse.json({
  //     status: 400,
  //     ok: false,
  //     message: "Failed to read username or userId",
  //   });
  // }

  if (!session) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authorized",
    });
  }

  try {
    const user = await User.findOne({
      username: username,
    })
      .select({ password: 0, email: 0 })
      .populate([
        {
          path: "threads",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "likes",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "replies",
          select: "text image createdAt likes replies",
          populate: {
            path: "user",
            select: "username image",
          },
        },
        {
          path: "followers._id",
          select: "username image",
        },
        {
          path: "following._id",
          select: "username image",
        },
      ]);

    const userById = await User.findOne({
      _id: userId,
    }).select({
      password: 0,
      email: 0,
      bio: 0,
      website: 0,
      likes: 0,
      replies: 0,
      threads: 0,
      followers: 0,
      following: 0,
      activeChats: 0,
      createdAt: 0,
      updatedAt: 0,
      bookmarks: 0,
      onBoarded: 0,
    });

    if (user || userById) {
      return NextResponse.json({
        status: 200,
        ok: true,
        data: user || userById,
        message: "User session found!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user session!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
