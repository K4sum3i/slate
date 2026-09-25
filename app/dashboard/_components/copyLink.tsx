"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Copy } from "lucide-react";

export default function copyLink({ slug }: { slug: string }) {
  const [, copy] = useCopyToClipboard();
  const url = "http://localhost:3000";

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
          title: "An unexpected error has occurred. Please try again later.",
          description: error,
        });
      });
  };
  return (
    <Button variant={"ghost"} onClick={handleCopy(`${url}/${slug}`)}>
      <Copy size={16} />
    </Button>
  );
}
