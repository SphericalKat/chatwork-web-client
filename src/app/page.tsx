import { getCurrentSession } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { authApi } from "@/lib/chatwork";

export default async function Home() {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login/chatwork");
  }

  const rooms = await authApi.roomsGet();
  redirect(`/room/${rooms[0].roomId}`);
}
