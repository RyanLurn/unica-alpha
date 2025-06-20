import { use$ } from "@legendapp/state/react";
import { memo } from "react";
import MessageAvatar from "@/components/message/avatar";
import MessageContent from "@/components/message/content/main";
import type { MessageType } from "@/database/schemas/message";
import streamStore$ from "@/stores/stream";

// Memoized so that when a new message is added to the parent list, this component will not rerender
const MessageBubble = memo(function MessageBubble({
  role,
  content,
  isStreaming,
}: Omit<MessageType, "id">) {
  const streamingContent = use$(streamStore$);
  return (
    <div className="flex w-full gap-x-2">
      <MessageAvatar role={role} />
      <div className="flex w-full flex-col gap-y-2">
        <div className="text-lg font-semibold">
          {role === "user" ? "Ryan" : "Unica"}
        </div>
        <MessageContent content={isStreaming ? streamingContent : content} />
      </div>
    </div>
  );
});

export default MessageBubble;
