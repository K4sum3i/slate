import { Links, LinksTags, Tags } from "@/app/generated/prisma/client";
import {
  BarChartIcon,
  EllipsisVertical,
  PenLine,
  QrCodeIcon,
  TrashIcon,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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

export default function prueba({
  linkInfo,
  linkTags,
  tagsInfo,
}: {
  linkInfo: Links;
  linkTags: LinksTags[];
  tagsInfo: Tags[];
}) {
  const cardTagsInfo = tagsInfo.filter((tag) =>
    linkTags.some((linkTag) => linkTag.tagId === tag.id),
  );

  // TODO: FIX TRIGGER
  return (
    <div className="border border-[#232323] rounded-[10px] oveflow-hidden bg-[#131313]">
      <div className="flex items-center gap-[14px] px-4 py-[13px] border-b border-[#232323]">
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
            <BarChartIcon size={14} />1 clicks
          </span>

          <span className="font-mono"></span>
          <span className="w-11 text-right text-neutral-400">1d</span>
        </div>
        <div className="flex items-center gap-0.5 shrink-0 relative">
          <CopyLink slug={linkInfo.slug} />
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={"transition-opacity hover:opacity-75"}
              >
                <EllipsisVertical size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DialogTrigger>
                  <DropdownMenuItem>
                    <PenLine size={16} />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <QrCodeIcon size={15} />
                    <span>Copy QR Code</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TrashIcon className="text-destructive" size={16} />
                    <span className="text-destructive">Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <CopyQR linkInfo={linkInfo} />
            <EditLink
              link={linkInfo}
              linkTags={cardTagsInfo}
              allTags={tagsInfo}
            />
            <DeleteLink link={linkInfo} />
          </Dialog>
        </div>
      </div>
    </div>
  );
}
