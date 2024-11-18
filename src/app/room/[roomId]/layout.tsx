import { authApi } from "@/lib/chatwork";
import { getCurrentSession } from "@/lib/cookies";
import { redirect } from "next/navigation";
import ResizableLayout from "@/components/room/ResizableLayout";
import { cookies } from "next/headers";

export default async function RoomLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ roomId: number }>;
}>) {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login/chatwork");
  }

  const me = await authApi.meGet();

  const rooms = await authApi.roomsGet();

  const cookieStore = await cookies();
  const layout = cookieStore.get("react-resizable-panels:layout");

  let defaultLayout;
  if (layout) {
    defaultLayout = JSON.parse(layout.value);
  }

  const { roomId } = await params;

  return (
    <section className="flex flex-col max-h-full h-full">
      {/* <nav className="text-white w-full justify-between bg-[#221127]">
        <div className="font-sans font-bold mx-4 my-4">Chatwork</div>
      </nav> */}
      <ResizableLayout
        defaultLayout={defaultLayout}
        rooms={rooms}
        currentRoomId={roomId}
        user={me}
      >
        {children}
      </ResizableLayout>
    </section>
  );
}
