"use client";

import type { z } from "zod";

import { useState } from "react";

import { LoaderIcon, RocketIcon } from "lucide-react";
import { Tags } from "@/app/generated/prisma/client";

interface CreateTagProps {
  children: ReactNode;
  tagsCreated: Tags[];
}

export function CreateTag(props: CreateTagProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  // Main form:
  const form = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
    defaultValues: {
      name: "",
      color: "#171717",
    },
  });

  // Form Submit method:
  const onSubmit = async (values: z.infer<typeof CreateTagSchema>) => {
    try {
      setLoading(true);

      if (props.tagsCreated.map((tag) => tag.name).includes(values.name)) {
        toast.error("The tag is already exist. Write another name.");
        return;
      }
      const result = await createTag(values);

      if (!result) {
        toast.error(
          "An unexpected error has occurred. Please try again later.",
          {
            duration: 10000,
            closeButton: true,
          },
        );
        return;
      }

      toast.success("Tag created successfully", {
        duration: 10000,
        closeButton: true,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("An unexpected error has occurred. Please try again later.");
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Create new tag</DialogTitle>
          <DialogDescription>
            Create a new tag to organize your links.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tag name:</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={loading} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isError && <Alert variant="error">{message}</Alert>}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <RocketIcon size={16} />
                )}
                <span>{loading ? "Creating..." : "Create Tag"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
