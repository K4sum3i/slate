"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ClipboardIcon } from "lucide-react";

export default function copyLink({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
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
    <DropdownMenuItem onClick={handleCopy(`${url}/${slug}`)}>
      <ClipboardIcon size={15} />
      <span>Copy to clipboard</span>
    </DropdownMenuItem>
  );
}
