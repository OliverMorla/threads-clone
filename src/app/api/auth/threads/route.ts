import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import Thread from "@/lib/models/thread.model";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase().catch((err) => {
      console.log(err instanceof Error && err.message);
    });

    const threads = await Thread.find()
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
