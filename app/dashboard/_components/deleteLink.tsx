"use client";

import { Links } from "@/app/generated/prisma/client";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { DeleteLinkSchema } from "@/lib/schemas";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { deleteLink } from "@/lib/actions/links";

export default function DeleteLink({
  link,
  onDone,
}: {
  link: Links;
  onDone?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof DeleteLinkSchema>>({
    resolver: zodResolver(DeleteLinkSchema),
  });

  const typedSlug = useWatch({ control: form.control, name: "slug" });
  const confirmed = typedSlug === link.slug;

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
      onDone?.();
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
    <DialogContent>
      <DialogHeader className="overflow-hidden">
        <DialogTitle className="truncate">
          Delete <span className="font-mono">/{link.slug}</span>
        </DialogTitle>
        <DialogDescription>
          Anyone using this link will lose access, and its click history is gone
          for good. This can&apos;t be undone.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(handleDelete)} className="space-y-5">
        <FieldGroup>
          <Controller
            name="slug"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Type <span className="font-mono">{link.slug}</span> to confirm
                </FieldLabel>
                <Input
                  {...field}
                  disabled={loading}
                  autoComplete="off"
                  spellCheck={false}
                  className="h-8 font-mono"
                />
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter className="mt-3">
          <DialogClose
            render={<Button variant={"ghost"} disabled={loading} size="lg" />}
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={loading || !confirmed}
            size="lg"
            variant={"destructive"}
            className="active:scale-[0.97] motion-reduce:active:scale-100"
          >
            {loading ? <Spinner /> : null}
            <span>{loading ? "Deleting..." : "Delete link"}</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
