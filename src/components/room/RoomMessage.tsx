import { Message } from "@/lib/chatwork";
import classNames from "classnames";
import { useCallback } from "react";

type Props = {
  message: Message;
  previousMessage: Message | null;
};

export default function RoomMessage({ message, previousMessage }: Props) {
  const isSameAccount = useCallback(
    (message: Message, previousMessage: Message | null) => {
      return previousMessage?.account?.accountId === message.account?.accountId;
    },
    [message, previousMessage]
  );

  return (
    <div className="flex mx-2 py-2" key={message.messageId}>
      {!isSameAccount(message, previousMessage) && (
        <img
          className="w-10 h-10 mt-1 rounded-lg"
          src={message.account?.avatarImageUrl}
          alt=""
        />
      )}
      <div className="flex flex-col ml-2">
        {!isSameAccount(message, previousMessage) && (
          <div className="font-bold">{message.account?.name}</div>
        )}
        <div className={classNames({
          "ml-10": isSameAccount(message, previousMessage),
        })}>{message.body}</div>
      </div>
    </div>
  );
}
