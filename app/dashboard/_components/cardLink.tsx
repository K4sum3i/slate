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
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = useState(false);

  const [action, setAction] = useState<DialogAction>(null);

  const openDialog = (next: Exclude<DialogAction, null>) => {
    setAction(next);
    setOpen(true);
  };

  const cardTagsInfo = tagsInfo.filter((tag) =>
    linkTags.some((linkTag) => linkTag.tagId === tag.id),
  );

  const displayUrl = linkInfo.url
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  return (
    <li className="grid min-h-[60px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 px-4 py-2.5 transition-colors duration-100 hover:bg-muted/50 has-[[aria-expanded=true]]:bg-muted/50 md:gap-x-4">
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <a
            href={`/${linkInfo.slug}`}
            className="min-w-0 truncate rounded-md font-mono text-sm font-medium text-foreground outline-none transition-opacity duration-100 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <span className="text-muted-foreground">/</span>
            {linkInfo.slug}
          </a>
          {cardTagsInfo.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2 text-[11px] leading-[18px] text-muted-foreground"
            >
              {tag.color && (
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
              )}

              {tag.name}
            </span>
          ))}
        </div>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {displayUrl}
        </p>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <ShowClick
          numberOfClicks={linkInfo.clicks}
          lastDate={linkInfo.lastClicked}
        />
        <time className="w-12 text-right font-mono tabular-nums">
          {formatDate(linkInfo.createdAt)}
        </time>
      </div>

      <div className="col-start-2 row-start-2 flex items-center gap-0.5 md:col-auto md:row-auto">
        <CopyLink slug={linkInfo.slug} />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground active:scale-[0.97] motion-reduce:active:scale-100"
              />
            }
          >
            <EllipsisVertical size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuItem onClick={() => openDialog("edit")}>
              <PenLine />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openDialog("qr")}>
              <QrCodeIcon />
              <span>Copy QR code</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openDialog("delete")}
              variant="destructive"
            >
              <TrashIcon />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={open} onOpenChange={setOpen}>
          {action === "qr" && <CopyQR linkInfo={linkInfo} />}
          {action === "edit" && (
            <EditLink
              link={linkInfo}
              linkTags={cardTagsInfo}
              allTags={tagsInfo}
              onDone={() => setOpen(false)}
            />
          )}
          {action === "delete" && (
            <DeleteLink link={linkInfo} onDone={() => setOpen(false)} />
          )}
        </Dialog>
      </div>
    </li>
    // <div className="group flex items-center gap-3 px-4 py-3 transition-colors duration-150 ease-out hover:bg-muted/60">
    //   <div className="flex min-w-0 flex-1 flex-col gap-1">
    //     <a
    //       href={`/${linkInfo.slug}`}
    //       className="flex items-center gap-1 font-mono text-sm font-medium text-foreground no-underline transition-opacity duration-75 hover:opacity-70"
    //     >
    //       <span className="text-muted-foreground">/</span>
    //       {linkInfo.slug}
    //     </a>
    //     <p
    //       className="truncate text-xs text-muted-foreground font-mono"
    //       title={linkInfo.url}
    //     >
    //       {linkInfo.url}
    //     </p>
    //   </div>
    //   <div className="flex flex-wrap items-center gap-1.5">
    //     {linkTags.map((tag) => {
    //       const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
    //       return (
    //         <span
    //           key={tag.tagId}
    //           className="rounded-full border border-border px-2 py-0.5 text-xs font-mono text-muted-foreground"
    //         >
    //           {tagInfo?.name}
    //         </span>
    //       );
    //     })}
    //   </div>
    //   <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
    //     <span className="flex items-center gap-1.5">
    //       <ShowClick
    //         numberOfClicks={linkInfo.clicks}
    //         lastDate={linkInfo.lastClicked}
    //       />
    //     </span>
    //     <span className="w-11 text-right">
    //       {formatDate(linkInfo.createdAt)}
    //     </span>
    //   </div>
    //   <div className="flex items-center gap-0.5">
    //     <CopyLink slug={linkInfo.slug} />
    //     <DropdownMenu>
    //       <DropdownMenuTrigger className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
    //         <EllipsisVertical size={15} />
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuItem onClick={() => setActiveDialog("edit")}>
    //           <PenLine size={16} />
    //           <span>Edit</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem onClick={() => setActiveDialog("qr")}>
    //           <QrCodeIcon size={15} />
    //           <span>Copy QR Code</span>
    //         </DropdownMenuItem>
    //         <DropdownMenuItem
    //           onClick={() => setActiveDialog("delete")}
    //           variant="destructive"
    //         >
    //           <TrashIcon size={16} />
    //           <span>Delete</span>
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //     <Dialog
    //       open={activeDialog !== null}
    //       onOpenChange={(open) => !open && setActiveDialog(null)}
    //     >
    //       {activeDialog === "qr" && <CopyQR linkInfo={linkInfo} />}
    //       {activeDialog === "edit" && (
    //         <EditLink
    //           link={linkInfo}
    //           linkTags={cardTagsInfo}
    //           allTags={tagsInfo}
    //         />
    //       )}
    //       {activeDialog === "delete" && <DeleteLink link={linkInfo} />}
    //     </Dialog>
    //   </div>
    // </div>
  );
}
