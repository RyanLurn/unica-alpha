import { smoothStream, streamText } from "ai";
import { toast } from "sonner";
import { v7 as uuid } from "uuid";
import PromptEditor from "@/components/prompt/editor";
import PromptOptions from "@/components/prompt/options";
import db from "@/database/connection";
import type { MessageType } from "@/database/schemas/message";
import { geminiFlash, googleProviderOptions } from "@/lib/ai/models/google";
import inputDisablingStore$ from "@/stores/input-disabling";
import promptStore$ from "@/stores/prompt";
import streamStore$ from "@/stores/stream";

function Prompt() {
  async function handleSend() {
    const prompt = promptStore$.get();
    if (prompt.trim() === "") return;

    promptStore$.set("");
    inputDisablingStore$.set(true);

    const userMessage: MessageType = {
      id: uuid(),
      role: "user",
      content: prompt,
      isStreaming: false,
    };
    await db.messages.add(userMessage);

    const messages = await db.messages.toArray();

    const aiMessage: MessageType = {
      id: uuid(),
      role: "assistant",
      content: "",
      isStreaming: true,
    };
    await db.messages.add(aiMessage);

    const { fullStream } = streamText({
      model: geminiFlash,
      messages,
      providerOptions: {
        google: googleProviderOptions,
      },
      experimental_transform: smoothStream({
        delayInMs: 15,
        chunking: "word",
      }),
    });

    let streamContent: string = "";
    let isThinking: boolean | null = null;
    const error: unknown[] = [];

    for await (const streamPart of fullStream) {
      if (streamPart.type === "reasoning") {
        if (isThinking === null) {
          streamContent += "<think>";
          isThinking = true;
        }
      } else if (streamPart.type === "text-delta") {
        if (isThinking === true) {
          streamContent += "</think>";
          isThinking = false;
        }
      } else if (streamPart.type === "source") {
        console.log(streamPart.source);
        continue;
      } else if (streamPart.type === "finish") {
        console.log("Finish reason:", streamPart.finishReason);
        console.log("Usage:", streamPart.usage);
        console.log("Provider metadata:", streamPart.providerMetadata);
        continue;
      } else if (streamPart.type === "error") {
        error.push(streamPart.error);
        continue;
      } else {
        continue;
      }

      streamContent += streamPart.textDelta;
      streamStore$.set(streamContent);
    }

    if (error.length > 0) {
      toast.error("Errors occurred. Check the console for details.");
      console.error("Errors:", error);
      streamContent = "Something went wrong while generating the response.";
    } else {
      toast.success("Response generated successfully.");
    }

    await db.messages.update(aiMessage.id, {
      content: streamContent,
      isStreaming: false,
    });

    streamStore$.set("");
    inputDisablingStore$.set(false);
  }

  return (
    <div className="sticky bottom-3 flex max-h-1/2 w-full flex-col gap-y-3 rounded-lg border-2 border-solid border-border bg-sidebar px-4 py-3">
      <PromptEditor handleSend={handleSend} />
      <PromptOptions handleSend={handleSend} />
    </div>
  );
}

export default Prompt;
