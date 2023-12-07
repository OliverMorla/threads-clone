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

  console.log(userId, session?.sub, action);

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

        const doesFollowExist = await User.findOne(
          {
            _id: session.sub,
          },
          {
            following: {
              $elemMatch: {
                _id: userId,
              },
            },
          }
        );

        console.log(doesFollowExist.following);

        if (doesFollowExist.following.length > 0) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You are already following this user",
          });
        }

        // add follow count to original user
        const addFollowingToUser = await User.findByIdAndUpdate(
          session.sub, // assuming this is the correct user ID
          {
            $push: {
              following: {
                _id: userId, // ensure this is a valid user ID
                followedDate: new Date().toISOString(),
              },
            },
          }
        );

        console.log(addFollowingToUser);

        // add follow count to second user
        const addFollowerToUser2 = await User.findByIdAndUpdate(
          userId, // assuming this is the correct user ID
          {
            $push: {
              followers: {
                _id: session.sub, // ensure this is a valid user ID
                followedDate: new Date().toISOString(),
              },
            },
          }
        );

        console.log(addFollowerToUser2);

        if (addFollowingToUser && addFollowerToUser2) {
          return NextResponse.json({
            status: 200,
            ok: true,
            message: "Followed user successfully",
          });
        }
      } catch (err) {
        console.log(err);
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

        const doesFollowExist = await User.findOne(
          {
            _id: session.sub,
          },
          {
            following: {
              $elemMatch: {
                _id: userId,
              },
            },
          }
        );

        console.log(doesFollowExist);

        if (!doesFollowExist) {
          return NextResponse.json({
            status: 400,
            ok: false,
            message: "You are not following this user",
          });
        }

        // remove follow count to original user
        const removeFollowingToUser = await User.findByIdAndUpdate(
          session.sub, // assuming this is the correct user ID
          {
            $pull: {
              following: {
                _id: userId, // ensure this is a valid user ID
              },
            },
          }
        );

        // remove follow count to second user
        const removeFollowerToUser2 = await User.findByIdAndUpdate(
          userId, // assuming this is the correct user ID
          {
            $pull: {
              followers: {
                _id: session.sub, // ensure this is a valid user ID
              },
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
