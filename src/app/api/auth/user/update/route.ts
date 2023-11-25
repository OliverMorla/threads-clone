import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { username, bio, name, email, image, website, password } =
    await req.json();

  if (session) {
    try {
      const user: User | null = await User.findOne(
        { _id: session?.sub },
        { password: 0 }
      );

      const updatedUser = await User.findOneAndUpdate(
        { _id: session?.sub },
        {
          username: username !== "" ? username : user?.username,
          bio: bio !== "" ? bio : user?.bio,
          name: name !== "" ? name : user?.name,
          email: email !== "" ? email : user?.email,
          image: image !== "" ? image : user?.image,
          website: website !== "" ? website : user?.website,
        }
      );

      if (user) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "User updated successfully",
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
      message: "You are not authorized",
    });
  }
}
