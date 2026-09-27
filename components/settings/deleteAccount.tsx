"use client";

import { cn } from "cn";
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
import { Trash2Icon, TrashIcon } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { useState } from "react";
import { deleteProfile } from "@/lib/actions/profile";
import { toast } from "../ui/toast";

export default function deleteAccount({ email }: { email: string }) {
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
        return `Your account has been deleted.`;
      },
      error: "Failed to delete account. Please try again or contact us.",
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
        <form onSubmit={handleDeleteAccount}>
          <div>
            <p>
              To confrim, please type your email address: <span>{email}</span>
            </p>
            <Input
              type="email"
              className="input"
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Your email address"
              disabled={loading}
            />
            <DialogFooter className="mt-3">
              <DialogClose>
                <Button variant={"ghost"} disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={loading || confirmEmail !== email}
                variant={"destructive"}
              >
                {loading ? <Spinner /> : <TrashIcon size={16} />}
                <span>{loading ? "Deleting..." : "Delete"}</span>
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
