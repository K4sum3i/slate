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
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateLinkSchema } from "@/lib/schemas";
import { Tags } from "@/app/generated/prisma/client";
import { RocketIcon, ShuffleIcon, TagsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import SelectedTags from "./selectedTags";
import { toast } from "@/components/ui/toast";
import { checkIfSlugExist, createLink } from "@/lib/actions/links";

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
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
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
      setError(true);
      setMessage("The URL and the slug cannot be the same");
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

      const result = await createLink(values);

      if (result.error && result.limit) {
        toast.add({
          type: "info",
          description: `${result.error}`,
        });
      }

      toast.add({
        type: "success",
        description: "Creation link disabled for now",
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "An unexpected error has occurred. Please try again later.",
      });
      console.error(error);
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomSlug = Math.random().toString(36).substring(7);
    form.setValue("slug", randomSlug);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <FieldGroup>
              <Controller
                name="url"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Destination URL:</FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      autoComplete="off"
                      placeholder="https://"
                    />
                  </Field>
                )}
              />
              <Controller
                name="slug"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Short link:</FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        {...field}
                        disabled={loading}
                        autoComplete="off"
                        placeholder="mylink"
                      />
                      <Button
                        onClick={handleGenerateRandomSlug}
                        variant={"outline"}
                        className={
                          "absolute right-0 rounded-none rounded-br-md rounded-tr-md"
                        }
                      >
                        <ShuffleIcon size={14} />
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
                    <FieldLabel>Description (optional):</FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Enter a description"
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
              <div className="flex items-center justify-center space-x-2 rounded-md border-neutral-200 py-3 text-sm dark:border-neutral-800">
                <TagsIcon size={16} />
                <p className="font-medium">You dont have any tag bd</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : <RocketIcon size={16} />}
                <span>{loading ? "Creating..." : "Create Tag"}</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
