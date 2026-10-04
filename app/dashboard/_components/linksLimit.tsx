import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "cn";
import { PackageIcon, TriangleAlertIcon } from "lucide-react";

export default function linksLimit({
  userLinks,
  maxLinks,
}: {
  userLinks: number;
  maxLinks: number;
}) {
  const ratio = maxLinks > 0 ? Math.min(userLinks / maxLinks, 1) : 0;
  const atLimit = userLinks >= maxLinks;
  const nearLimit = !atLimit && ratio >= 0.8;

  return (
    <Tooltip>
      <TooltipTrigger className="inline-flex h-8 cursor-default items-center gap-2.5 rounded-md border border-border px-2.5 font-mono text-xs tabular-nums outline-none transition-colors duration-100 hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/40">
        <span
          className={cn(
            atLimit && "text-destructive",
            nearLimit && "text-amber-600 dark:text-amber-400",
          )}
        >
          {userLinks}/{maxLinks}
        </span>
        <span
          role="meter"
          className="h-1 w-10 overflow-hidden rounded-full bg-muted"
        >
          <span
            className={cn(
              "block h-full origin-left rounded-full bg-foreground/70 transition-transform duration-300 ease-(--ease-out) motion-reduce:transition-none",
              nearLimit && "bg-amber-500",
              atLimit && "bg-destructive",
            )}
            style={{ transform: `scaleX(${ratio})` }}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        {atLimit ? (
          <p>You have reached the maximum limit of {maxLinks} links.</p>
        ) : (
          <p>
            You have created {userLinks} out of {maxLinks} links.
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
