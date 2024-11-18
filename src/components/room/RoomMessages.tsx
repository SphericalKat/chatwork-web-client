"use client";
import { Message } from "@/lib/chatwork";
import { useEffect } from "react";
import useSWR from "swr";
import RoomMessage from "./RoomMessage";
import classNames from "classnames";

type Props = {
  roomId: number;
};

export default function RoomMessages({ roomId }: Props) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data,
    error,
    isLoading,
  }: { data: Message[]; error: any; isLoading: boolean } = useSWR(
    `/api/rooms/${roomId}/messages`,
    fetcher
  );

  // scroll down to the bottom of the messages once the messages are loaded
  useEffect(() => {
    if (data) {
      console.log("scrolling to the bottom");
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [data]);

  return (
    <div
      className={classNames("flex flex-col flex-1 w-full h-full text-white", {
        "items-center justify-center": isLoading,
        "justify-start items-start": !isLoading,
      })}
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}
      <div className="flex flex-col w-full h-full overflow-auto items-start justify-start px-4">
        {data &&
          (data as Message[]).map((message, idx) => (
            <RoomMessage
              key={message.messageId}
              message={message}
              previousMessage={data[idx - 1]}
            />
          ))}
      </div>
    </div>
  );
}
