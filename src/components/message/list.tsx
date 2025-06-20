import { useLiveQuery } from "dexie-react-hooks";
import MessageBubble from "@/components/message/bubble";
import db from "@/database/connection";

function MessageList() {
  const messages = useLiveQuery(() => db.messages.toArray());

  return (
    <div className="flex w-full flex-1 flex-col gap-y-6">
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          role={message.role}
          content={message.content}
          isStreaming={message.isStreaming}
        />
      ))}
    </div>
  );
}

export default MessageList;
