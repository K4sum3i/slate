import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateName from "../settings/updateName";
import ExportAllLinks from "../settings/exportAllLinks";
import DeleteAccount from "../settings/deleteAccount";
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
            name={String(session.user.name ?? "")}
            username={String(session.user.username ?? "")}
            email={String(session.user.email ?? "")}
          />

          <section className="flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="space-y-1">
              <h3 className="text-xs font-medium">Export links</h3>
              <p className="text-xs/relaxed text-balance text-muted-foreground">
                Download all your shortened links and their information.
              </p>
            </div>
            <ExportAllLinks />
          </section>

          <section className="py-5">
            <div className="space-y-1 rounded-lg border border-destructive/20 bg-destructive/5 p-4 dark:bg-destructive/10">
              <h3 className="text-xs font-medium text-destructive">
                Delete account
              </h3>
              <p className="text-xs/relaxed text-balance text-muted-foreground">
                Permanently delete your account and all your shortened links.
                This action cannot be undone.
              </p>
              <DeleteAccount email={session.user.email!} />
            </div>
          </section>
        </div>
      </div>
    </DialogContent>
  );
}
