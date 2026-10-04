"use client";

import { EditLinkSchema } from "@/lib/schemas";
import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Links, Tags } from "@/app/generated/prisma/client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  onDone,
}: {
  link: Links;
  linkTags: Tags[];
  allTags: Tags[];
  onDone?: () => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [slugLocked, setSlugLocked] = useState<boolean>(true);

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
      onDone?.();
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
        <DialogTitle>Edit link</DialogTitle>
        <DialogDescription className="block truncate font-mono">
          /{link.slug}
        </DialogDescription>
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
                    disabled={loading}
                    autoComplete="off"
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
                  <FieldLabel>Short link:</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={slugLocked || loading}
                      autoComplete="off"
                      spellCheck={false}
                      className="h-8 pr-9 font-mono"
                    />
                    {slugLocked ? (
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              type="button"
                              variant={"ghost"}
                              size={"icon-sm"}
                              className={`absolute top-1 right-1 text-muted-foreground active:scale-[0.97] motion-reduce:active:scale-100`}
                            />
                          }
                        >
                          <LockIcon size={16} />
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-72 gap-3">
                          <p className="text-xs/relaxed">
                            Changing the short link removes access from the
                            previous one, and anyone can claim it afterwards.
                          </p>
                          <Button
                            type="button"
                            className={
                              "w-full active:scale-[0.97] motion-reduce:active:scale-100"
                            }
                            size={"lg"}
                            variant={"outline"}
                            onClick={() => setSlugLocked(false)}
                          >
                            <LockOpenIcon size={16} />
                            <span>Unlock anyway</span>
                          </Button>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Button
                        type="button"
                        variant={"ghost"}
                        size={"icon-sm"}
                        className={
                          "absolute top-1 right-1 text-muted-foreground active:scale-[0.97] motion-reduce:active:scale-100"
                        }
                        onClick={() => {
                          setSlugLocked(true);
                          form.setValue("slug", link.slug);
                          form.clearErrors("slug");
                        }}
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
                  <FieldLabel>
                    Description{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Input
                    {...field}
                    disabled={loading}
                    defaultValue={link.description ?? "Description"}
                    className="h-8"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant={"ghost"} size={"lg"} disabled={loading} />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              size={"lg"}
              disabled={loading}
              className={"active:scale-[0.97] motion-reduce:active:scale-100"}
            >
              {loading ? <Spinner /> : null}
              <span>{loading ? "Saving..." : "Save changes"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
}
