"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UpdateProfileSchema } from "@/lib/schemas";
import { useState } from "react";
import { AlertTriangleIcon, SaveIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { updateProfile } from "@/lib/actions/profile";
import { toast } from "../ui/toast";

export default function updateName({
  name,
  username,
  email,
}: {
  name: string;
  username: string;
  email: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: name,
      username: username,
      email: email,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateProfileSchema>) => {
    try {
      setLoading(true);
      await updateProfile(values);
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
    <>
      <form className="space-y-4 py-5">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-xs">Your name:</FieldLabel>

                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Name"
                    disabled={loading}
                    {...field}
                    className="transition-[border-color,box-shadow,color] duration-150"
                  />

                  <Button
                    type="submit"
                    disabled={loading || form.getValues().name === name}
                    className="active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    {loading ? <Spinner /> : <SaveIcon size={16} />}
                    <span>{loading ? "Saving..." : "Save"}</span>
                  </Button>
                </div>
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel className="text-xs">Your email:</FieldLabel>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Name"
                    disabled
                    {...field}
                    className="transition-[border-color,box-shadow,color] duration-150"
                  />
                  <FieldDescription className="flex items-center gap-2 pl-1 text-destructive">
                    <AlertTriangleIcon size={14} />
                    <span>
                      Email address is managed by your OAuth provider.
                    </span>
                  </FieldDescription>
                </div>
              </Field>
            )}
          />
        </FieldGroup>
        {/*
          {nameError ? (
            <FieldError>{nameError}</FieldError>
          ) : (
            <FieldDescription>
              Change the name associated with your account.
            </FieldDescription>
          )} */}
      </form>
    </>
  );
}
