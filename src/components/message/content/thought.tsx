import { memo } from "react";
import MarkdownContent from "@/components/message/content/markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ThoughtContent = memo(function ThoughtContent({
  thinking,
}: {
  thinking: string;
}) {
  return (
    <div className="w-full rounded-lg bg-sidebar px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Model's thought</AccordionTrigger>
          <AccordionContent>
            <MarkdownContent content={thinking} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

export default ThoughtContent;
