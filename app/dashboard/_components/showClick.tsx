import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export default function showClick({
  numberOfClicks,
  lastDate,
}: {
  numberOfClicks: number;
  lastDate: Date | null;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default rounded-sm font-mono text-xs tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/40 md:text-right">
        <span
          className={cn(
            numberOfClicks > 0 ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {compact.format(numberOfClicks)}
        </span>{" "}
        <span className="text-muted-foreground">
          {numberOfClicks === 1 ? "click" : "clicks"}
        </span>
      </TooltipTrigger>
      <TooltipContent sideOffset={5}>
        {lastDate ? (
          <p>Last clicked {formatDate(lastDate)} ago</p>
        ) : (
          <p>No clicks yet</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
