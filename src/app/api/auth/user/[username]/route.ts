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

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const user = await User.findOne({ username: username }).select({
      password: 0,
    });

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        data: user,
        message: "User found!",
      });
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

export async function POST(req: NextRequest) {
  const { tab, username }: {
    tab: string
    username: string
  } = await req.json();

  console.log(tab, username);

  try {
    const user = await User.findOne({
      username: username,
    }).populate({
      path: tab.toLowerCase(),
      populate: {
        path: "user",
        select: "username image",
      },
    });

    console.log(user);

    if (user) {
      return NextResponse.json({
        status: 200,
        ok: true,
        data: user,
        message: "User found!",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch user!",
      prisma_error: err instanceof Error ? err.message : undefined,
    });
  }
}
