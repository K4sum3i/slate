"use client";

import { Links } from "@/app/generated/prisma/client";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
import { DeleteLinkSchema } from "@/lib/schemas";
import { Spinner } from "@/components/ui/spinner";
import { TrashIcon } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { deleteLink } from "@/lib/actions/links";

export default function DeleteLink({
  link,
  trigger,
}: {
  link: Links;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof DeleteLinkSchema>>({
    resolver: zodResolver(DeleteLinkSchema),
  });

  const handleDelete = async (values: z.infer<typeof DeleteLinkSchema>) => {
    if (values.slug !== link.slug) {
      toast.add({
        type: "error",
        description: "The slug does not match",
      });
      return;
    }

    try {
      setLoading(true);
      await deleteLink(link.id);
      setOpen(false);
      toast.add({
        type: "success",
        title: "Link deleted successfully.",
        description: `The link /${link.slug} has been deleted.`,
      });
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "An unexpected error has occurred. Please try again later.",
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
          <DialogTitle>Delete /{link.slug}</DialogTitle>
          <DialogDescription className={"text-red-500 dark:text-red-400"}>
            Access to the link will be permanently removed. This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleDelete)}>
          <FieldGroup>
            <Controller
              name="slug"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>
                    Type{" "}
                    <span className="font-mono">{link.slug} to confirm:</span>
                  </FieldLabel>
                  <Input {...field} disabled={loading} autoComplete="off" />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-3">
            <DialogClose>
              <Button variant={"ghost"} disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading} variant={"destructive"}>
              {loading ? <Spinner /> : <TrashIcon size={16} />}
              <span>{loading ? "Deleting..." : "Delete"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
