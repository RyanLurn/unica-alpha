type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming: boolean;
};

export type { MessageType };
