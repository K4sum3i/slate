"use client";

import { Tags } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { removeTag } from "@/lib/actions/tags";
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function deleteTag({ tag }: { tag: Tags }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteTag = async () => {
    try {
      setLoading(true);
      await removeTag(tag.id);
      setOpen(false);
      toast.add({
        type: "success",
        title: "Tag deleted successfully.",
        description: `The tag ${tag.name} has been deleted.`,
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "An error occurred while deleting the tag. Please try again",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant={"ghost"}
            className="mr-1 grid size-6 shrink-0 place-items-center rounded-sm text-muted-foreground opacity-0 outline-none transition-[opacity,color] duration-100 ease-out group-hover/tag:opacity-100 hover:text-destructive focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/40 pointer-coarse:opacity-100"
          />
        }
      >
        <XIcon className="size-3.5" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete &ldquo;{tag.name}&rdquo;</DialogTitle>
          <DialogDescription>
            Your links stay as they are. They just lose this tag.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            render={<Button variant={"ghost"} size={"lg"} disabled={loading} />}
          >
            Close
          </DialogClose>
          <Button
            variant={"destructive"}
            size={"lg"}
            onClick={handleDeleteTag}
            disabled={loading}
            className="active:scale-[0.97] motion-reduce:active:scale-100"
          >
            {loading ? <Spinner /> : null}
            <span>{loading ? "Deleting..." : "Delete tag"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
