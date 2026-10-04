"use client";

import { Tags } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, PlusIcon, TagIcon, TagsIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DeleteTag from "./deleteTag";
import CreateTag from "./createTag";
import { cn } from "cn";

const DEFAULT_TAG_COLOR = "#71717a";

export default function SearchTag({
  tags,
  tagSelected,
}: {
  tags: Tags[];
  tagSelected: string;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const searchTagParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selected = tags.find((tag) => tag.id === tagSelected);

  const setTag = (value?: string) => {
    const params = new URLSearchParams(searchTagParams);
    if (value) params.set("tag", value);
    else params.delete("tag");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label={
              selected ? `Tag filter: ${selected.name}` : "Filter by tag"
            }
            className={cn(
              "h-8 gap-1.5 px-2.5",
              "transition-[transform,background-color,border-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "active:scale-[0.97] motion-reduce:active:scale-100",
              selected && "border-foreground/30 bg-muted/60",
            )}
          />
        }
      >
        {selected ? (
          <>
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: selected.color ?? DEFAULT_TAG_COLOR }}
            />
            <span className="max-w-24 truncate">{selected.name}</span>
          </>
        ) : (
          <>
            <TagsIcon />
            <span className="hidden md:inline">Tags</span>
          </>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className={cn(
          "w-64 gap-2 p-1.5",
          "origin-(--transform-origin)",
          "transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "data-starting-style:scale-95 data-starting-style:opacity-0",
          "data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-100",
          "motion-reduce:data-starting-style:scale-100 motion-reduce:data-ending-style:scale-100",
        )}
      >
        <div className="flex items-center justify-between px-1.5 pt-1">
          <p className="text-xs font-medium">My tags</p>
          {selected && (
            <button
              type="button"
              onClick={() => setTag()}
              className="rounded-sm px-1 text-xs text-muted-foreground outline-none transition-[color,transform] duration-150 ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.97] motion-reduce:active:scale-100"
            >
              Clear filter
            </button>
          )}
        </div>

        {tags.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-2 py-6 text-center text-xs text-muted-foreground">
            <TagIcon className="size-5" />
            <span>No tags yet. Create one to group your links.</span>
          </div>
        ) : (
          <ul className="flex max-h-64 flex-col overflow-y-auto overscroll-contain">
            {tags.map((tag) => {
              const active = tag.id === tagSelected;
              return (
                <li
                  key={tag.id}
                  className={cn(
                    "group/tag flex items-center rounded-md transition-colors duration-100 ease-out hover:bg-muted",
                    active && "bg-muted/60",
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setTag(active ? undefined : tag.id);
                      setIsOpened(false);
                    }}
                    className={cn(
                      "flex min-h-8 min-w-0 flex-1 items-center gap-2 rounded-md px-1.5 text-left text-xs outline-none",
                      "transition-transform duration-150 ease-out active:scale-[0.98] motion-reduce:active:scale-100",
                      "focus-visible:ring-2 focus-visible:ring-ring/40",
                      active && "font-medium",
                    )}
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: tag.color ?? DEFAULT_TAG_COLOR,
                      }}
                    />
                    <span className="truncate">{tag.name}</span>
                    {active && (
                      <CheckIcon className="ml-auto size-3.5 shrink-0" />
                    )}
                  </button>

                  <DeleteTag tag={tag} />
                </li>
              );
            })}
          </ul>
        )}

        <CreateTag tagsCreated={tags}>
          <PlusIcon />
          <span>Create tag</span>
        </CreateTag>
      </PopoverContent>
    </Popover>
  );
}
