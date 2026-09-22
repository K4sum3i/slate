"use client";

import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { RocketIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateTagSchema } from "@/lib/schemas";
import { toast } from "@/components/ui/toast";
import { createTag } from "@/lib/actions/tags";

export default function CreateTag({
  children,
  tagsCreated,
}: {
  children: React.ReactNode;
  tagsCreated: Tags[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: "",
      color: "#171717",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateTagSchema>) => {
    try {
      setLoading(true);
      if (tagsCreated.map((tag) => tag.name).includes(values.name)) {
        toast.add({
          type: "error",
          description: "The tag is already exist. Write another name.",
        });
        return;
      }
      const result = await createTag(values);
      if (!result) {
        toast.add({
          type: "error",
          description:
            "An unexpected error has occurred. Please try again later.",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Tag created successfully",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new tag</DialogTitle>
          <DialogDescription>
            Create a new tag to organize your links
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-5">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Tag Name:</FieldLabel>
                    <Input
                      {...field}
                      disabled={loading}
                      autoComplete="off"
                    ></Input>
                  </Field>
                )}
              ></Controller>
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant={"ghost"} disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : <RocketIcon size={16} />}
              <span>{loading ? "Creating..." : "Create Tag"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
