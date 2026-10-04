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
import { CheckIcon, RocketIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateTagSchema } from "@/lib/schemas";
import { toast } from "@/components/ui/toast";
import { createTag } from "@/lib/actions/tags";
import { cn } from "@/lib/utils";

const SWATCHES = [
  { name: "Graphite", value: "#171717" },
  { name: "Rose", value: "#e58ddf" },
  { name: "Clay", value: "#c2603f" },
  { name: "Amber", value: "#d19a2a" },
  { name: "Moss", value: "#5f8f5a" },
  { name: "Steel", value: "#4f7cac" },
] as const;

export default function CreateTag({
  children,
  tagsCreated,
}: {
  children: React.ReactNode;
  tagsCreated: Tags[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: "",
      color: SWATCHES[0].value,
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
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className={cn(
              "active:scale-[0.97] motion-reduce:active:scale-100",
              "w-full justify-start",
            )}
          />
        }
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create tag</DialogTitle>
          <DialogDescription>
            Group links you want to find together.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    disabled={loading}
                    autoComplete="off"
                    className="h-8"
                  />
                </Field>
              )}
            />
            <Controller
              name="color"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Color</FieldLabel>
                  <div className="flex gap-2" role="radiogroup">
                    {SWATCHES.map((swatch) => {
                      const active = field.value === swatch.value;
                      return (
                        <button
                          key={swatch.value}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          aria-label={swatch.name}
                          disabled={loading}
                          onClick={() => field.onChange(swatch.value)}
                          className={cn(
                            "grid size-7 place-items-center rounded-full text-white outline-none ring-offset-2 ring-offset-popover transition-[transform,box-shadow] duration-150 ease-(--ease-out) focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.94] motion-reduce:transition-none",
                            active && "ring-2 ring-foreground/70",
                          )}
                          style={{ backgroundColor: swatch.value }}
                        >
                          {active && <CheckIcon size={16} />}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={<Button variant={"ghost"} size="lg" disabled={loading} />}
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="active:scale-[0.97] motion-reduce:active:scale-100"
            >
              {loading ? <Spinner /> : null}
              <span>{loading ? "Creating..." : "Create Tag"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
