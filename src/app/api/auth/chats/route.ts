import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";
import User from "@/lib/models/user.model";
import Message from "@/lib/models/message.model";
import Conversation from "@/lib/models/conversation.model";

// get all active chats
export async function GET(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (!user) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const doesMessageExist = await Message.findOne({
      $or: [{ recipient: user.sub }, { sender: user.sub }],
    });

    // console.log(doesMessageExist);

    if (doesMessageExist) {
      const doesActiveChatExist = await User.findOne({
        _id: user?.sub,
        activeChats: { $elemMatch: { $eq: doesMessageExist.sender } },
      });

      // console.log(doesActiveChatExist);

      if (doesActiveChatExist && doesMessageExist.sender !== user?.sub) {
        const chats = await User.find({
          _id: user?.sub,
        })
          .select("activeChats")
          .populate("activeChats", "image username");

        const conversations = await Conversation.find({
          participants: { $elemMatch: { $eq: user?.sub } },
        }).populate([
          {
            path: "participants",
            select: "image username",
          },
          {
            path: "lastMessage",
            select: "content createdAt",
          },
        ]);;

        if (chats) {
          return NextResponse.json({
            status: 200,
            ok: true,
            message: "Chats fetched successfully",
            data: chats,
            conversations: conversations,
          });
        }
      } else {
        const addExistingChats = await User.findOneAndUpdate(
          {
            _id: user?.sub,
          },
          {
            $push: {
              activeChats:
                doesMessageExist.sender !== user?.sub &&
                doesMessageExist.sender,
            },
          }
        );
      }

      const chats = await User.find({
        _id: user?.sub,
      })
        .select("activeChats")
        .populate("activeChats", "image username");

      const conversations = await Conversation.find({
        participants: { $elemMatch: { $eq: user?.sub } },
      }).populate([
        {
          path: "participants",
          select: "image username",
        },
        {
          path: "lastMessage",
          select: "content createdAt",
        },
      ]);

      console.log(conversations);

      if (chats) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Chats fetched successfully",
          data: chats,
          conversations: conversations,
        });
      }
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch chats",
    });
  }
}

// delete a chat
export async function DELETE(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { userId } = await req.json();

  if (!user) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  if (!userId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to read userId!",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const chats = await User.findOneAndUpdate(
      {
        _id: user?.sub,
      },
      {
        $pull: {
          activeChats: userId,
        },
      }
    );
    if (chats) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Chat deleted successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to delete chat",
    });
  }
}

// create a new chat
export async function POST(req: NextRequest) {
  const user = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { userId } = await req.json();

  if (!user) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const chat = await User.findOneAndUpdate(
      {
        _id: user?.sub,
      },
      {
        $push: {
          activeChats: userId,
        },
      }
    );

    if (chat) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Chat created successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to create chat",
    });
  }
}
