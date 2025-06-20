import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import MessageBubble from "@/components/message/bubble";
import db from "@/database/connection";

function MessageList({
  endRef,
  scrollToBottom,
}: {
  endRef: React.RefObject<HTMLDivElement | null>;
  scrollToBottom: () => void;
}) {
  const messages = useLiveQuery(() => db.messages.toArray());

  useEffect(() => {
    if ((messages?.length ?? -1) > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          isStreaming={message.isStreaming}
          scrollToBottom={scrollToBottom}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default MessageList;
