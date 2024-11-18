"use client";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Room } from "../lib/chatwork";
import Hash from "./icons/Hash";
import classNames from "classnames";

export default function ResizableLayout({
  rooms,
  children,
  defaultLayout = [33, 67],
}: {
  rooms: Room[];
  children: React.ReactNode;
  defaultLayout: number[] | undefined;
}) {
  const onLayout = (sizes: number[]) => {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  };

  return (
    <PanelGroup direction="horizontal" className="" onLayout={onLayout}>
      <Panel defaultSize={defaultLayout[0]}>
        <nav className="flex flex-col h-full w-full overflow-y-auto bg-[#221127] text-[#e3ceebcc]">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className={classNames("items-center overflow-x-clip whitespace-nowrap text-ellipsis font-sans mx-4 px-2 rounded-md py-2 hover:bg-[#efe1f514] cursor-pointer", {
                'font-bold text-white': room.unreadNum ?? 0 > 0,
              })}
            >
              <div className="flex items-center overflow-visible">
                <Hash />
                <span className="ml-2">{room.name}</span>
              </div>
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
