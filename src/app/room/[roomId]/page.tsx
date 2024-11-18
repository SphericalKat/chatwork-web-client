import { authApi } from "@/lib/chatwork";
import { getCurrentSession } from "@/lib/cookies";

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
  const [roomDetails, ] = await Promise.all([
    authApi.roomsRoomIdGet({ roomId }),
    // authApi.roomsRoomIdMessagesGet({ roomId }),
  ]);

  return (
    <div>
      <h1 className="font-sans text-white">{ roomDetails.name }</h1>
    </div>
  );
}
