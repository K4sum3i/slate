"use client";

import { useState } from "react";
import { cn } from "cn";
import { Trash2Icon } from "lucide-react";

import { Field, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { deleteProfile } from "@/lib/actions/profile";
import { toast } from "../ui/toast";

export default function DeleteAccount({ email }: { email: string }) {
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmEmail !== email) {
      toast.add({
        type: "error",
        description: "Email does not match",
      });
      return;
    }
    setLoading(true);
    toast.promise(deleteProfile(), {
      loading: "Deleting account...",
      success: () => {
        setLoading(false);
        return "Your account has been deleted.";
      },
      error: () => {
        setLoading(false);
        return "Failed to delete account. Please try again or contact us.";
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className={cn(
            "mt-3 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
            "active:scale-[0.98] motion-reduce:active:scale-100",
          )}
        >
          <Trash2Icon />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete your account?</DialogTitle>
          <DialogDescription>
            This permanently deletes your account and every shortened link in
            it. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDeleteAccount} noValidate className="space-y-4">
          <Field>
            <FieldLabel className="text-xs">
              Type <span className="font-medium text-foreground">{email}</span>{" "}
              to confirm:
            </FieldLabel>
            <Input
              type="email"
              autoComplete="off"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Your email address"
              disabled={loading}
              className="transition-[border-color,box-shadow,color] duration-150"
            />
          </Field>
          <DialogFooter>
            <DialogClose
              render={<Button variant={"ghost"} disabled={loading} />}
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || confirmEmail !== email}
              variant={"destructive"}
              className="active:scale-[0.98] motion-reduce:active:scale-100"
            >
              {loading ? <Spinner /> : <Trash2Icon />}
              <span>{loading ? "Deleting..." : "Delete"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
