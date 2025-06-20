import MessageList from "@/components/message/list";
import Prompt from "@/components/prompt/main";
import useAutoScroll from "@/hooks/auto-scroll";

function ChatPage() {
  const { containerRef, endRef, scrollToBottom, handleScroll } =
    useAutoScroll();

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex h-full w-full flex-col overflow-y-auto"
    >
      <div className="mx-auto mt-6 flex w-full max-w-3xl flex-1 flex-col gap-y-9">
        <MessageList endRef={endRef} scrollToBottom={scrollToBottom} />
        <Prompt />
      </div>
    </div>
  );
}

export default ChatPage;
