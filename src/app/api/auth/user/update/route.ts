import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { username, bio, name, email, image } = await req.json();

  if (!username || !bio || !name || !email || !image) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: session?.sub },
      {
        username,
        bio,
        name,
        email,
        image,
      }
    );

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "User updated successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Something went wrong",
    });
  }
}
