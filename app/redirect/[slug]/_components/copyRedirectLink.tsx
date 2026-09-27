"use client";

import { toast } from "@/components/ui/toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button } from "@/components/ui/button";
import { ClipboardIcon } from "lucide-react";

export default function copyRedirectLink({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.add({
          type: "success",
          title: "Link copied to clipboard",
          description: `${text}`,
        });
      })
      .catch((error) => {
        toast.add({
          type: "error",
          description: `An unexpected error has occurred. Please try again later. ${error}`,
        });
      });
  };

  return (
    <Button size="sm" className="space-x-2" onClick={handleCopy(`${slug}`)}>
      <ClipboardIcon size={15} />
      <span>Copy URL</span>
    </Button>
  );
}
