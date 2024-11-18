"use client";
import { authApi, Message } from "@/lib/chatwork";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import RoomMessage from "./RoomMessage";

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

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.toString()}</div>}
      <div className="flex flex-col w-full h-full overflow-y-auto items-start px-4">
        {data &&
          (data as Message[]).map((message, idx) => (
            <RoomMessage message={message} previousMessage={data[idx - 1]} />
          ))}
      </div>
    </div>
  );
}
