import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import Thread from "@/lib/models/thread.model";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (user) {
    try {
      const thread = await Thread.create({ text, user: user?.sub });

      if (thread) {
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
