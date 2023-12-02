import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";

export async function GET(req: NextRequest) {
  await connectToDatabase()
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));

  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (session) {
    const activity = await User.findById(session.sub)
      .populate([
        {
          path: "followers._id",
          select: "username image",// Fields to select from the populated User documents
        },
        {
          path: "following._id", // Populate the user reference in following
          select: "username image", // Fields to select from the populated User documents
        },
      ])
      .select({ password: 0, email: 0, __v: 0, bio: 0, website: 0 });

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
