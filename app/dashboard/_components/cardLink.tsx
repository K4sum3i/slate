"use client";

import { Links, LinksTags, Tags } from "@/app/generated/prisma/client";
import { EllipsisVertical, PenLine, QrCodeIcon, TrashIcon } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import CopyLink from "./copyLink";
import CopyQR from "./copyQR";
import EditLink from "./editLink";
import DeleteLink from "./deleteLink";
import ShowClick from "./showClick";
import { useState } from "react";
import { formatDate } from "@/lib/utils/formatDate";

type DialogAction = "edit" | "qr" | "delete" | null;

export default function cardLink({
  linkInfo,
  linkTags,
  tagsInfo,
}: {
  linkInfo: Links;
  linkTags: LinksTags[];
  tagsInfo: Tags[];
}) {
  const [activeDialog, setActiveDialog] = useState<DialogAction>(null);

  const cardTagsInfo = tagsInfo.filter((tag) =>
    linkTags.some((linkTag) => linkTag.tagId === tag.id),
  );

  return (
    <div className="group flex items-center gap-3 px-4 py-3 transition-colors duration-150 ease-out hover:bg-muted/60">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <a
          href={`/${linkInfo.slug}`}
          className="flex items-center gap-1 font-mono text-sm font-medium text-foreground no-underline transition-opacity duration-75 hover:opacity-70"
        >
          <span className="text-muted-foreground">/</span>
          {linkInfo.slug}
        </a>
        <p
          className="truncate text-xs text-muted-foreground font-mono"
          title={linkInfo.url}
        >
          {linkInfo.url}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {linkTags.map((tag) => {
          const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
          return (
            <span
              key={tag.tagId}
              className="rounded-full border border-border px-2 py-0.5 text-xs font-mono text-muted-foreground"
            >
              {tagInfo?.name}
            </span>
          );
        })}
      </div>
      <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <ShowClick
            numberOfClicks={linkInfo.clicks}
            lastDate={linkInfo.lastClicked}
          />
        </span>
        <span className="w-11 text-right">
          {formatDate(linkInfo.createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-0.5">
        <CopyLink slug={linkInfo.slug} />
        <DropdownMenu>
          <DropdownMenuTrigger
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <EllipsisVertical size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setActiveDialog("edit")}>
              <PenLine size={16} />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveDialog("qr")}>
              <QrCodeIcon size={15} />
              <span>Copy QR Code</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setActiveDialog("delete")}
              variant="destructive"
            >
              <TrashIcon size={16} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog
          open={activeDialog !== null}
          onOpenChange={(open) => !open && setActiveDialog(null)}
        >
          {activeDialog === "qr" && <CopyQR linkInfo={linkInfo} />}
          {activeDialog === "edit" && (
            <EditLink
              link={linkInfo}
              linkTags={cardTagsInfo}
              allTags={tagsInfo}
            />
          )}
          {activeDialog === "delete" && <DeleteLink link={linkInfo} />}
        </Dialog>
      </div>
    </div>
  );
}
