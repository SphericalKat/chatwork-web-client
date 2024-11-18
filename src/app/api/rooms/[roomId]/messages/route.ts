import { authApi } from "@/lib/chatwork";
import { getCurrentSession } from "@/lib/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
): Promise<NextResponse> {
  const { user } = await getCurrentSession();
  if (!user) {
    return new NextResponse(null, {
      status: 401,
    });
  }

  const roomId = (await params).roomId;

  const roomMessages = await authApi.roomsRoomIdMessagesGet({
    roomId: parseInt(roomId),
    force: 1,
  });


  return NextResponse.json(roomMessages);
}
