import { use$ } from "@legendapp/state/react";
import { ArrowUp, FilePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import inputDisablingStore$ from "@/stores/input-disabling";

function PromptOptions({ handleSend }: { handleSend: () => Promise<void> }) {
  const isDisabled = use$(inputDisablingStore$);

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-x-2">
        <Button size="icon" variant="outline" disabled={isDisabled}>
          <FilePlus />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Button
          size="icon"
          disabled={isDisabled}
          onClick={() => void handleSend()}
        >
          {isDisabled ? <Loader2 className="animate-spin" /> : <ArrowUp />}
        </Button>
      </div>
    </div>
  );
}

export default PromptOptions;
