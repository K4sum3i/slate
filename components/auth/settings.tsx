import { DownloadIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { cn } from "cn";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateName from "../settings/updateName";
import { auth } from "@/auth";

export default async function AccountDialog() {
  const session = await auth();

  if (!session) return null;

  return (
    <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[520px]">
      <DialogHeader className="gap-1.5 border-b border-border px-5 pt-5 pb-4 pr-12">
        <DialogTitle className="text-sm">Account settings</DialogTitle>
        <DialogDescription>
          Manage your account and your shortened links.
        </DialogDescription>
      </DialogHeader>

      <div className="max-h-[70dvh] overflow-y-auto overscroll-contain px-5 pb-5">
        <div className="divide-y divide-border">
          <UpdateName
            name={session.user.name!}
            username={session.user.username!}
            email={session.user.email!}
          />

          {/* Export links */}
          {/* <section className="flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="space-y-1">
              <h3 className="text-xs font-medium">Export links</h3>
              <p className="text-xs/relaxed text-balance text-muted-foreground">
                Download all your shortened links and their information.
              </p>
            </div>

            <Button
              variant="outline"
              className="shrink-0 active:scale-[0.98] motion-reduce:active:scale-100"
            >
              {status === "exporting" ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Exporting
                </>
              ) : (
                <>
                  <DownloadIcon />
                  Export
                </>
              )}
            </Button>
          </section> */}

          {/* Delete account */}
          {/* <section className="py-5">
            <div className="space-y-1 rounded-lg border border-destructive/20 bg-destructive/5 p-4 dark:bg-destructive/10">
              <h3 className="text-xs font-medium text-destructive">
                Delete account
              </h3>
              <p className="text-xs/relaxed text-balance text-muted-foreground">
                Permanently delete your account and all your shortened links.
                This action cannot be undone.
              </p>

              <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogTrigger
                  render={
                    <Button
                      variant="outline"
                      className={cn(
                        "mt-3 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive",
                        "active:scale-[0.98] motion-reduce:active:scale-100",
                      )}
                    />
                  }
                >
                  <Trash2Icon />
                  Delete account
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                      <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently deletes your account and every shortened
                      link in it. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={status === "deleting"}>
                      Keep account
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      disabled={status === "deleting"}
                      onClick={handleDeleteAccount}
                    >
                      {status === "deleting" ? (
                        <>
                          <Loader2Icon className="animate-spin" />
                          Deleting
                        </>
                      ) : (
                        "Delete account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </section> */}
        </div>
      </div>
    </DialogContent>
  );
}
