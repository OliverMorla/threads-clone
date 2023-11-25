import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import Thread from "@/lib/models/thread.model";

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
      message: "Failed to read username!",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const thread = await Thread.findById({ _id: threadId }).populate({
      path: "user",
      select: "username image",
    });

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
  if (!threadId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to read username!",
    });
  }

  const { childrenThreadId } = await req.json();

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const reply = await Thread.findByIdAndUpdate(
      { _id: threadId },
      { $push: { childrenThreads: childrenThreadId } }
    );

    if (reply) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Reply added successfully!",
        data: reply,
      });
    } else {
      return NextResponse.json({
        status: 404,
        ok: false,
        message: "Failed to add reply!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to add reply!",
      error: err instanceof Error ? err.message : undefined,
    });
  }
}
