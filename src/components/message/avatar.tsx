import { memo } from "react";
import aiImgUrl from "@/assets/ai-img.jpg";
import userImgUrl from "@/assets/user-img.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Memoized because MessageBubble (this component's parent) can rerender because message.content changes
const MessageAvatar = memo(function MessageAvatar({
  role,
}: {
  role: "user" | "assistant";
}) {
  const fallback = role === "user" ? "RY" : "UN";

  return (
    <Avatar>
      <AvatarImage src={role === "user" ? userImgUrl : aiImgUrl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
});

export default MessageAvatar;
