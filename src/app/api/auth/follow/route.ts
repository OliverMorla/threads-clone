import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import User from "@/lib/models/user.model";

export async function POST(req: NextRequest) {
  await connectToDatabase()
    .then((res) => console.log("connected"))
    .catch((err) => console.log(err));

  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { userId, action } = await req.json();

  if (!userId && action) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Missing required fields",
    });
  }

  if (session) {
    if (action === "follow") {
      try {
        if (session.sub === userId) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You cannot follow yourself",
          });
        }

        const doesFollowExist = await User.findOne({
          _id: session.sub,
          "following.users": userId,
        });

        if (doesFollowExist) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You are already following this user",
          });
        }

        // add follow count to original user
        const addFollowingToUser = await User.findByIdAndUpdate(
          {
            _id: session.sub,
          },
          {
            $push: {
              following: {
                _id: userId,
                followedDate: new Date().toISOString(),
              },
            },
          }
        );

        // add follow count to second user
        const addFollowerToUser2 = await User.findByIdAndUpdate(
          {
            _id: userId,
          },
          {
            $push: {
              followers: {
                _id: session.sub,
                followedDate: new Date().toISOString(),
              },
            },
          }
        );

        if (addFollowingToUser && addFollowerToUser2) {
          return NextResponse.json({
            status: 200,
            ok: true,
            message: "Followed user successfully",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to follow user",
          error: err instanceof Error ? err.message : null,
        });
      }
    } else if (action === "unfollow") {
      try {
        if (session.sub === userId) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You cannot unfollow yourself",
          });
        }

        const doesFollowExist = await User.findOne({
          _id: session.sub,
          "following.users": userId,
        });

        if (doesFollowExist) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You are not following this user",
          });
        }

        // remove follow count to original user
        const removeFollowingToUser = await User.findByIdAndUpdate(
          {
            _id: session.sub,
          },
          {
            $pull: {
              following: userId,
            },
          }
        );

        // remove follow count to second user
        const removeFollowerToUser2 = await User.findByIdAndUpdate(
          {
            _id: userId,
          },
          {
            $pull: {
              followers: session.sub,
            },
          }
        );
        if (removeFollowingToUser && removeFollowerToUser2) {
          return NextResponse.json({
            status: 200,
            ok: true,
            message: "Unfollowed user successfully",
          });
        }
      } catch (err) {
        return NextResponse.json({
          status: 500,
          ok: false,
          message: "Failed to follow user",
          error: err instanceof Error ? err.message : null,
        });
      }
    }
  } else {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authorized to perform this action",
    });
  }
}

export const revalidate = 0;
