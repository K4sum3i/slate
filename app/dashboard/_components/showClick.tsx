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
}: {
  numberOfClicks: number;
  lastDate: Date | null;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={"cursor-default items-center text-xs"}>
          <span className="flex items-center gap-[5px] min-w-[64px] font-mono">
            <BarChartIcon size={14} />
            {numberOfClicks} clicks
          </span>
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
