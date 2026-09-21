import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
  const max = userLinks >= maxLinks;
  const mid = userLinks >= maxLinks / 2;

  return (
    <TooltipProvider delay={500}>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={buttonVariants({
              variant: "outline",
              className: "cursor-default font-mono shadow-none",
            })}
          >
            <div
              className={cn(
                mid ? "text-yellow-500" : "",
                max ? "text-red-500" : "",
                "flex items-center space-x-2",
              )}
            >
              {max ? (
                <TriangleAlertIcon size={14} />
              ) : (
                <PackageIcon size={14} />
              )}
              <span>
                {userLinks < 10 ? `0${userLinks}` : userLinks}
                {"/"}
                {maxLinks < 10 ? `0${maxLinks}` : maxLinks}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {max ? (
            <p>You have reached the maximum limit of {maxLinks} links.</p>
          ) : (
            <p>
              You have created {userLinks} out of {maxLinks} links.
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
