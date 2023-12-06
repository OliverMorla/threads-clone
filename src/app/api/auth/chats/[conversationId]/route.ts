import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/moongose";
import { getToken } from "next-auth/jwt";

import Message from "@/lib/models/message.model";
import Conversation from "@/lib/models/conversation.model";

type Params = {
  conversationId: string;
};

// get all messages for a conversation
export async function GET(
  req: NextRequest,
  {
    params: { conversationId },
  }: {
    params: Params;
  }
) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  if (!session) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  if (!conversationId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to read conversationId",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [session.sub, conversationId] }
    });

    const messages = await Message.find({
      conversationId: conversation._id,
    })
      .populate([
        {
          path: "sender",
          select: "username image",
        },
        {
          path: "recipient",
          select: "username image",
        },
      ])
      .sort({ createdAt: 1 });

    if (messages) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Messages fetched successfully",
        data: messages,
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to fetch messages",
      error: err instanceof Error ? err.message : null,
    });
  }
}

// send a message
export async function POST(
  req: NextRequest,
  {
    params: { conversationId },
  }: {
    params: Params;
  }
) {
  const session = await getToken({ req, secret: process.env.OAUTH_SECRET });

  const { content, recipientId } = await req.json();

  if (!session) {
    return NextResponse.json({
      status: 401,
      ok: false,
      message: "You are not authenticated",
    });
  }

  const senderId = session.sub;

  if (!recipientId || !conversationId) {
    return NextResponse.json({
      status: 400,
      ok: false,
      message: "Failed to read recipientId or conversationId",
    });
  }

  await connectToDatabase().catch((err) => {
    console.log(err instanceof Error && err.message);
  });

  try {
    const doesConversationExist = await Conversation.findOne({
      $or: [{ _id: conversationId }, { _id: senderId }],
    });

    if (doesConversationExist) {
      const message = await Message.create({
        conversationId: doesConversationExist._id,
        sender: senderId,
        recipient: recipientId,
        content,
      });

      const conversation = await Conversation.findOneAndUpdate(
        {
          _id: doesConversationExist._id,
        },
        {
          $set: {
            lastMessage: message._id,
          },
        }
      );

      if (conversation) {
        return NextResponse.json({
          status: 200,
          ok: true,
          message: "Message sent successfully",
        });
      }
    }

    const conversation = await Conversation.create({
      _id: conversationId,
      participants: [recipientId, senderId],
    });

    const message = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      recipient: recipientId,
      content,
    });

    const addUsersToConversation = await Conversation.findOneAndUpdate(
      {
        _id: conversation._id,
      },
      {
        $set: {
          lastMessage: message._id,
        },
      }
    );

    if (addUsersToConversation) {
      return NextResponse.json({
        status: 200,
        ok: true,
        message: "Message sent successfully",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      message: "Failed to send message",
    });
  }
}
