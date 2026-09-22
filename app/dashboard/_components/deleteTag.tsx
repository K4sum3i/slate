"use client";

import { Tags } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useState } from "react";

export default function deleteTag({
  tag,
  trigger,
}: {
  tag: Tags;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteTag = async () => {
    try {
      setLoading(true);
      await removeTag(tag.id);
      setOpen(false);
      toast.add({
        type: "success",
        title: "Link deleted successfully.",
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
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete "{tag.name}" tag</DialogTitle>
          <DialogDescription>
            Delete the tag will not delete the link associated with it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={handleDeleteTag}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Delete Tag"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
