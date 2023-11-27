import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";

export async function GET(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (session) {
    const activity = await User.findById(session.sub).populate([
      {
        path: "followers",
        select: "username image followedDate",
      },
      {
        path: "following",
        select: "username image followedDate",
      },
    ]);

    if (activity) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "User activity fetched successfully",
        data: activity,
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
