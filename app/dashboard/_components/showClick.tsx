import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "@/lib/utils/formatDate";
import { cn } from "cn";
import { BarChartIcon } from "lucide-react";
export default function showClick({
  numberOfClicks,
  lastDate,
  className,
}: {
  numberOfClicks: number;
  lastDate: Date | null;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "flex cursor-default items-center space-x-2 text-xs",
            className,
          )}
        >
          <BarChartIcon size={14} />
          <span className="font-mono">{numberOfClicks} clicks</span>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          {lastDate ? (
            <p>Last clicked: {formatDate(lastDate)}</p>
          ) : (
            <p>No clicks yet</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
