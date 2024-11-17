import { getCurrentSession } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { authApi } from "@/lib/chatwork";

export default async function Home() {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login/chatwork");
  }

  const me = await authApi.meGet();

  return (
    <div>
      {me.name}
    </div>
  );
}
