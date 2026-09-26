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
    <div className="flex items-center gap-[14px] px-4 py-[13px] border-b transition-[background] duration-[120ms] ease-[var(--ease-out)] animate-[in_.38s_var(--ease-out)_forwards]">
      <div className="flex-1 min-w-0">
        <a
          href={`/${linkInfo}`}
          className="font-mono text-sm font-medium no-underline text-text transition-opacity duration-75 hover:opacity-80"
        >
          <span>/</span>
          {linkInfo.slug}
        </a>
        <p
          className="text-xs text-neutral-400 truncate select-all font-mono"
          title={linkInfo.url}
        >
          {linkInfo.url}
        </p>
      </div>
      <div className="flex gap-1 shrink-0">
        {linkTags.map((tag) => {
          const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
          return (
            <span
              key={tag.tagId}
              className="text-xs font-mono px-2 py-[0.5px] rounded-full border rounded-md border-neutral-500 text-neutral-400"
            >
              {tagInfo?.name}
            </span>
          );
        })}
      </div>
      <div className="flex items-center gap-4 shrink-0 text-neutral-400 text-sm font-mono">
        <span className="flex items-center gap-[5px] min-w-[64px]">
          <ShowClick
            numberOfClicks={linkInfo.clicks}
            lastDate={linkInfo.lastClicked}
          />
        </span>

        <span className="font-mono"></span>
        <span className="w-11 text-right text-neutral-400">
          {formatDate(linkInfo.createdAt)}
        </span>
      </div>
      <div className="flex items-center gap-0.5 shrink-0 relative">
        <CopyLink slug={linkInfo.slug} />
        <DropdownMenu>
          <DropdownMenuTrigger
            className={"transition-opacity hover:opacity-75"}
          >
            <EllipsisVertical size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
              <TrashIcon className="text-destructive" size={16} />
              <span className="text-destructive">Delete</span>
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
