"use client";

import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangleIcon, CheckIcon, SaveIcon } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { UpdateProfileSchema } from "@/lib/schemas";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "../ui/toast";

export default function UpdateName({
  name,
  username,
  email,
}: {
  name: string;
  username: string;
  email: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name,
      username,
      email,
    },
  });

  // Watched (not read once) so the Save button reacts as the user types.
  const currentName = useWatch({ control: form.control, name: "name" });

  // Brief, motivated confirmation: state indication that the save landed.
  useEffect(() => {
    if (!saved) return;
    const timeout = setTimeout(() => setSaved(false), 1400);
    return () => clearTimeout(timeout);
  }, [saved]);

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    try {
      setLoading(true);
      await updateProfile(values);
      setSaved(true);
      toast.add({
        type: "success",
        description: "Profile updated successfully",
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
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 py-5"
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={!!fieldState.error}>
              <FieldLabel className="text-xs">Your name:</FieldLabel>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Name"
                  disabled={loading}
                  aria-invalid={!!fieldState.error}
                  {...field}
                  className="transition-[border-color,box-shadow,color] duration-150"
                />

                <Button
                  type="submit"
                  disabled={loading || currentName === name}
                  className="min-w-26 shrink-0 active:scale-[0.98] motion-reduce:active:scale-100"
                >
                  {loading ? <Spinner /> : saved ? <CheckIcon /> : <SaveIcon />}
                  <span>
                    {loading ? "Saving..." : saved ? "Saved" : "Save"}
                  </span>
                </Button>
              </div>

              <FieldDescription>
                This is the name shown across Slate.
              </FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field }) => (
            <Field>
              <FieldLabel className="text-xs">Your email:</FieldLabel>
              <Input
                placeholder="Email"
                disabled
                {...field}
                className="transition-[border-color,box-shadow,color] duration-150"
              />
              <FieldDescription className="flex items-center gap-1.5">
                <AlertTriangleIcon className="size-3.5 shrink-0" />
                <span>Email address is managed by your OAuth provider.</span>
              </FieldDescription>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
