"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "cn";
import { CheckIcon, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const url = "http://localhost:3000";

export default function copyLink({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setCopied(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), 1500);
        toast.add({
          type: "success",
          title: "Link copied to clipboard",
          description: `${text}`,
        });
      })
      .catch((error) => {
        toast.add({
          type: "error",
          title: "An unexpected error has occurred. Please try again later.",
          description: error,
        });
      });
  };
  return (
    <Button
      size={"icon"}
      className={
        "text-muted-foreground active:scale-[0.97] motion-reduce:active:scale-100"
      }
      variant={"ghost"}
      onClick={handleCopy(`${url}/${slug}`)}
    >
      <span className="grid place-items-center">
        <Copy
          className={cn(
            "col-start-1 row-start-1 transition-[opacity,transform,filter] duration-150 ease-(--ease-out) motion-reduce:transition-opacity",
            copied
              ? "scale-75 opacity-0 blur-[2px]"
              : "scale-100 opacity-100 blur-0",
          )}
        />
        <CheckIcon
          className={cn(
            "col-start-1 row-start-1 transition-[opacity,transform,filter] duration-150 ease-(--ease-out) motion-reduce:transition-opacity",
            "text-foreground",
            copied
              ? "scale-100 opacity-100 blur-0"
              : "scale-75 opacity-0 blur-[2px]",
          )}
        />
      </span>
    </Button>
  );
}
