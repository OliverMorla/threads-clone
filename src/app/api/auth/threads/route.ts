import { connectToDatabase } from "@/lib/db/moongose";
import Thread from "@/lib/models/thread.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const threads = await Thread.find({})
      .populate("user", "username")
      .sort({ createdAt: -1 });

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
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
}
