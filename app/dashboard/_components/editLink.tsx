"use client";

import { EditLinkSchema } from "@/lib/schemas";
import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Links, Tags } from "@/app/generated/prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon, LockOpenIcon, SaveIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateLink } from "@/lib/actions/links";
import { toast } from "@/components/ui/toast";

export default function editLink({
  link,
  linkTags,
  allTags,
}: {
  link: Links;
  linkTags: Tags[];
  allTags: Tags[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [unlockSlug, setUnlockSlug] = useState<boolean>(true);

  const form = useForm<z.infer<typeof EditLinkSchema>>({
    resolver: zodResolver(EditLinkSchema),
    defaultValues: {
      id: link.id,
      url: link.url,
      slug: link.slug,
      description: link.description ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EditLinkSchema>) => {
    if (values.slug === values.url) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the slug cannot be the same");
      return;
    }

    try {
      setLoading(true);
      await updateLink(values);
      toast.add({
        type: "success",
        title: "Link edited successfully.",
        description: `Url: https://localhost:3000/${values.slug}`,
      });
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        description:
          "An unexpected error has occurred. Please try again later.",
      });
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="overflow-hidden">
        <DialogTitle>Edit link</DialogTitle>
        <DialogDescription className={"block truncate"}>
          /{link.slug}
        </DialogDescription>
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
                      placeholder={link.url}
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
                        disabled={unlockSlug}
                        placeholder={link.slug}
                      />
                      {unlockSlug ? (
                        <Popover>
                          <PopoverTrigger
                            className={
                              "absolute bottom-0 right-0 top-0 flex items-center px-3"
                            }
                          >
                            <LockIcon size={16} />
                          </PopoverTrigger>
                          <PopoverContent className={"max-w-72 text-sm"}>
                            <p className="mb-2">
                              Editing the custom link will remove access from
                              the previous link and it will be available to
                              everyone. Are you sure you want to continue?
                            </p>
                            <Button
                              className={"w-full"}
                              variant={"outline"}
                              onClick={() => setUnlockSlug(false)}
                            >
                              <LockOpenIcon size={16} />
                              <span>Unlock</span>
                            </Button>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Button
                          className={
                            "absolute bottom-0 right-0 top-0 flex items-center px-3"
                          }
                          type="button"
                          onClick={() => setUnlockSlug(true)}
                        >
                          <LockOpenIcon size={16} />
                        </Button>
                      )}
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
                      defaultValue={link.description ?? "Description"}
                    />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : <SaveIcon size={16} />}
                <span>{loading ? "Saving..." : "Save"}</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
