"use client";

import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateLinkSchema } from "@/lib/schemas";
import { Tags } from "@/app/generated/prisma/client";
import { PlusIcon, ShuffleIcon, TagsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SelectedTags from "./selectedTags";
import { toast } from "@/components/ui/toast";
import { checkIfSlugExist, createLink } from "@/lib/actions/links";
import { cn } from "@/lib/utils";

export default function CreateLink({
  children,
  slug,
  tags,
}: {
  children: React.ReactNode;
  slug?: string;
  tags: Tags[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      url: "",
      slug: slug ?? "",
      description: "",
    },
  });

  const handleAddTags = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
      return;
    }
    if (selectedTags.length >= 2) {
      toast.add({
        type: "error",
        description: "You cant add more than 2 tags to a link.",
      });
      return;
    }
    setSelectedTags([...selectedTags, tagId]);
  };

  const handleDeleteTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagId));
  };

  const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
    if (values.slug === values.url) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const slugExist = await checkIfSlugExist(values.slug);
      if (slugExist) {
        toast.add({
          type: "error",
          description:
            "The slug is already exist. Write another or generate a random slug.",
        });
        return;
      }

      const result = await createLink(values, selectedTags);

      if (result.error) {
        toast.add({
          type: result.limit ? "info" : "error",
          description: `${result.error}`,
        });
        return;
      }

      toast.add({ type: "success", description: "Link created" });
      form.reset();
      setSelectedTags([]);
      setOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "An unexpected error has occurred. Please try again later.",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRandomSlug = () => {
    const randomSlug = Math.random().toString(36).substring(2, 8);
    form.setValue("slug", randomSlug, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="lg"
            className={cn(
              "active:scale-[0.97] motion-reduce:active:scale-100",
              "h-8 px-3",
            )}
          />
        }
      >
        <PlusIcon size={16} />
        <span className="max-w-[16ch] truncate sm:max-w-[28ch]">
          {children}
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New link</DialogTitle>
          <DialogDescription>
            Paste a description and pick a short slug for it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Destination URL</FieldLabel>
                  <Input
                    {...field}
                    type="url"
                    inputMode="url"
                    disabled={loading}
                    autoComplete="off"
                    placeholder="https://"
                    className="h-8 font-mono"
                  />
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Short link</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={loading}
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="my-link"
                      className="h-8 pr-24 font-mono"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleGenerateRandomSlug}
                      variant={"ghost"}
                      className={cn(
                        "active:scale-[0.97] motion-reduce:active:scale-100",
                        "absolute top-1 right-1 h-6 text-muted-foreground",
                      )}
                    >
                      <ShuffleIcon />
                      <span>Randomize</span>
                    </Button>
                  </div>
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>
                    Description{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    {...field}
                    disabled={loading}
                    autoComplete="off"
                    placeholder="Enter a description"
                    className="h-8"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          {tags.length > 0 ? (
            <SelectedTags
              selectedTags={selectedTags}
              onSelectTag={handleAddTags}
              onDeleteTag={handleDeleteTag}
              tags={tags}
            />
          ) : (
            <p className="flex items-center gap-2 rounded-md border border-dashed border-border px-3 py-2.5 text-xs text-muted-foreground">
              <TagsIcon size={16} className="shrink-0" />
              Create a tag from the Tags menu to organize your links.
            </p>
          )}
          <DialogFooter>
            <DialogClose
              render={<Button variant={"ghost"} size="lg" disabled={loading} />}
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {loading ? <Spinner /> : null}
              <span>{loading ? "Creating..." : "Create link"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
