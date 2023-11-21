import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import bcrypt from "bcrypt";
import User from "@/lib/models/user.model";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "All fields are required.",
    });
  }

  try {
    const doesEmailExist = await User.findOne({ email });
    const doesUsernameExist = await User.findOne({ username });

    if (doesEmailExist) {
      return NextResponse.json(
        {
          status: 409,
          ok: false,
          message: "Email already Exist!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Prevent caching of this response
          },
        }
      );
    }

    if (doesUsernameExist) {
      return NextResponse.json(
        {
          status: 409,
          ok: false,
          message: "Username already Exist!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Prevent caching of this response
          },
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    if (encryptedPassword) {
      const user = await User.create({
        username,
        name: null,
        email,
        password: encryptedPassword,
        image: null,
        bio: null,
        verified: false,
        threads: null,
        createdAt: Date.now(),
        following: null,
        followers: null,
        bookmarks: null,
      });

      if (user) {
        return NextResponse.json(
          {
            status: 201,
            ok: true,
            message: "Your account has been created!",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store", // Prevent caching of this response
            },
          }
        );
      }
    } else {
      return NextResponse.json({
        status: 400,
        ok: false,
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: err instanceof Error ? err.message : "Something went wrong!",
    });
  }
}
