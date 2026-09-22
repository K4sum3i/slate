import { Links, LinksTags, Tags } from "@/app/generated/prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils/formatDate";
import { cn } from "cn";
import { ChevronDownIcon, CopyIcon, QrCodeIcon, SquarePen } from "lucide-react";
import CopyLink from "./copyLink";
import CopyQR from "./copyQR";
import EditLink from "./editLink";
import { Button } from "@/components/ui/button";

export default function CardLink({
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

  return (
    <div className="flex w-full flex-col rounded-md border border-neutral p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <a
          href={`/${linkInfo.slug}`}
          className="block space-x-[1px] overflow-hidden truncate font-medium transition-opacity duration-75 hover:opacity-80"
        >
          <span className="text-sm opacity-40">/</span>
          <span>{linkInfo.slug}</span>
        </a>
        <div className="flex items-center space-x-3">
          {/* TODO SHOWCLICK */}
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={"transition-opacity hover:opacity-75"}
              >
                <CopyIcon size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <CopyLink slug={linkInfo.slug} />
                <DialogTrigger>
                  <DropdownMenuItem>
                    <QrCodeIcon size={15} />
                    <span>Copy QR Code</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <CopyQR linkInfo={linkInfo} />
          </Dialog>
          <EditLink
            trigger={
              <Button className={"transition-opacity hover:opacity-75"}>
                <SquarePen size={16} />
              </Button>
            }
            link={linkInfo}
            linkTags={cardTagsInfo}
            allTags={tagsInfo}
          />
          {/* TODO DELETELINK */}
        </div>
      </div>
      <p
        className="mb-2 truncate select-all font-mono text-sm text-neutral-500 dark:text-neutral-400"
        title={linkInfo.url}
      >
        {linkInfo.url}
      </p>
      <Collapsible>
        <div className="flex items-center justify-between font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400 md:space-x-2">
          <div className="flex max-w-[75%] items-center space-x-2">
            {linkTags.map((tag) => {
              const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
              return (
                <span
                  key={tag.tagId}
                  className={cn(
                    "rounded-md border border-neutral-200 px-2 py-[0.5px] font-mono text-xs dark:border-neutral-500",
                  )}
                >
                  {tagInfo?.name}
                </span>
              );
            })}
            <p
              className="hidden truncate md:block"
              title={linkInfo.description ?? ""}
            >
              {linkInfo.description ?? ""}
            </p>
            <CollapsibleTrigger
              className={
                "flex items-center transition-colors hover:text-neutral-900 dark:hover:text-white md:hidden"
              }
            >
              <ChevronDownIcon size={14} className="mr-2" />
              <span>Info</span>
            </CollapsibleTrigger>
          </div>
          <p>{formatDate(linkInfo.createdAt)}</p>
        </div>
        <CollapsibleContent className={"flex flex-col"}>
          <div className="my-2 p-2 shadow-sm">{/* TODO SHOWCLICK */}</div>
          {linkInfo.description && (
            <div className="p-2 shadow-sm">
              <p
                className="text-pretty text-sm"
                title={linkInfo.description ?? ""}
              >
                {linkInfo.description}
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
