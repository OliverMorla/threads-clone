import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import Thread from "@/lib/models/thread.model";

// get all threads for the homepage
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase().catch((err) => {
      console.log(err instanceof Error && err.message);
    });

    const threads = await Thread.find()
      .populate([
        {
          path: "user",
          select: "username image",
        },
        {
          path: "likes",
          select: "username image",
        },
      ])
      .sort({ createdAt: -1 })
      .where("parentId", [null, undefined]);

    if (threads) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Threads fetched successfully",
        data: threads,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : null,
    });
  }
}

export const revalidate = 0;

