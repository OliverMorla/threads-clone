import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import Thread from "@/lib/models/thread.model";

// get all threads for the homepage
export async function GET(req: NextRequest) {
  try {
    // connect to the database
    await connectToDatabase().catch((err) => {
      console.log(err instanceof Error && err.message);
    });

    // fetch all threads from the database and populate the user and likes fields
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

    // return the threads as a response if they exist
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
      message: "Failed to fetch threads",
      error: err instanceof Error ? err.message : null,
    });
  }
}

// will not store the response in the cache
export const revalidate = 0;
