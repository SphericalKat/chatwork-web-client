"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Account, Room } from "@/lib/chatwork";
import Hash from "@/components/icons/Hash";
import classNames from "classnames";
import Link from "next/link";

export default function ResizableLayout({
  user,
  rooms,
  currentRoomId,
  children,
  defaultLayout = [33, 67],
}: {
  user: Account;
  rooms: Room[];
  currentRoomId: number;
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
}) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  console.log(currentRoomId);

  return (
    <PanelGroup direction="horizontal" className="" onLayout={onLayout}>
      <Panel defaultSize={defaultLayout[0]} className="bg-[#221127]">
        {user && (
          <div className="mt-4 mb-6 font-sans mx-6 font-bold text-white text-xl">
            {user.organizationName}
          </div>
        )}
        <nav className="flex overflow-y-auto flex-col h-full w-full bg-[#221127] text-[#e3ceebcc]">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={classNames(
                "items-center overflow-x-clip whitespace-nowrap text-ellipsis font-sans mx-4 px-2 rounded-md py-2 cursor-pointer",
                {
                  "font-bold text-white": room.unreadNum ?? 0 > 0,
                  "bg-[#7d3986]": room.roomId == currentRoomId,
                  "hover:bg-[#efe1f514]": room.roomId != currentRoomId,
                }
              )}
            >
              <Link href={`/room/${room.roomId}`}>
                <div className="flex items-center overflow-visible">
                  <Hash />
                  <span className="ml-2 text-sm">{room.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </nav>
      </Panel>
      <PanelResizeHandle
        className="w-[1px] bg-[#221127e2]"
        id="resize-handle"
      />
      <Panel defaultSize={defaultLayout[1]}>
        <div className="h-full overflow-y-auto bg-[#1a1d21] border-l border-t border-[#221127e2]">
          {children}
        </div>
      </Panel>
    </PanelGroup>
  );
}
