import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import User from "@/lib/models/user.model";

type Params = {
  username: string;
};

export async function GET(
  req: NextRequest,
  {
    params: { username },
  }: {
    params: Params;
  }
) {
  if (!username) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to read username!",
    });
  }

  await connectToDatabase();

  try {
    const user = await User.findOne({ username: username }).select({
      password: 0,
    });

    if (user) {
      return NextResponse.json({ status: 200, ok: true, user: user });
    } else {
      return NextResponse.json({
        status: 404,
        ok: false,
        message: "User not found!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}