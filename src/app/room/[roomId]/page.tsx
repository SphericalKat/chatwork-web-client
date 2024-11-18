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
    <div className="flex flex-col w-full h-full">
      <div className="border-b border-[#38393a]">
        <h1 className="text-white font-bold font-lato px-4 py-4">{roomDetails.name}</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <RoomMessages roomId={roomId} />
      </Suspense>
    </div>
  );
}
