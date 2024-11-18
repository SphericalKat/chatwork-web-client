import RoomMessages from "@/components/room/RoomMessages";
import { authApi } from "@/lib/chatwork";
import { getCurrentSession } from "@/lib/cookies";
import { Suspense } from "react";

export default async function Room({
  params,
}: {
  params: Promise<{ roomId: number }>;
}) {
  const { roomId } = await params;
  const { user } = await getCurrentSession();
  if (!user) {
    return null;
  }
  const [roomDetails] = await Promise.all([authApi.roomsRoomIdGet({ roomId })]);

  return (
    <div>
      <h1 className="font-sans text-white">{roomDetails.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RoomMessages roomId={roomId} />
      </Suspense>
    </div>
  );
}
