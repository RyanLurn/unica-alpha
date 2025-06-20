import { use$ } from "@legendapp/state/react";
import inputDisablingStore$ from "@/stores/input-disabling";
import promptStore$ from "@/stores/prompt";

function PromptEditor({ handleSend }: { handleSend: () => Promise<void> }) {
  const prompt = use$(promptStore$);
  const isDisabled = use$(inputDisablingStore$);

  async function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSend();
    }
  }

  return (
    <textarea
      className="field-sizing-content min-h-16 resize-none focus:outline-none"
      rows={3}
      placeholder={
        isDisabled ? "Waiting for response..." : "Enter your message"
      }
      disabled={isDisabled}
      value={prompt}
      onChange={(e) => promptStore$.set(e.target.value)}
      onKeyDown={(e) => void handleKeyDown(e)}
    />
  );
}

export default PromptEditor;
