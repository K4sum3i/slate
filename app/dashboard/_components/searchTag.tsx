"use client";

import { Tags } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, SearchXIcon, TagIcon, TagsIcon, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import DeleteTag from "./deleteTag";

export default function searchTag({
  tags,
  tagSelected,
  tagName,
}: {
  tags: Tags[];
  tagSelected: string;
  tagName?: string;
}) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const searchTagParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchTag = (value: string) => {
    const params = new URLSearchParams(searchTagParams);
    if (value) params.set("tag", value);
    else params.delete("tag");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleDeleteTag = () => {
    const params = new URLSearchParams(searchTagParams);
    params.delete("tag");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger>
        <Button variant={"outline"}>
          {isOpened ? <XIcon size={16} /> : <TagsIcon size={16} />}
          {tagName ? (
            <span>
              {tags.map((tag) => {
                if (tag.id === tagName) {
                  return tag.name;
                }
              })}
            </span>
          ) : (
            <span className="hidden md:block">Select a tag</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>My Tags ({tags.length})</p>
        <div className="mb-2 flex w-full flex-col space-y-1">
          {tags.length === 0 && (
            <div className="my-4 flex flex-col items-center justify-center space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <TagIcon size={24} strokeWidth={1.5} />
              <span>No tags found</span>
            </div>
          )}
          {tags.map((tag) => {
            return (
              <div
                key={tag.id}
                aria-label={tag.name}
                className="flex w-full items-center justify-between rounded-md border border-neutral-200 px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80 dark:border-neutral-800"
                style={{
                  backgroundColor: tag.color ? `${tag.color}` : "#171717",
                  color: tag.color ? "#fff" : "#171717",
                }}
              >
                <button
                  onClick={() => handleSearchTag(tag.id)}
                  className="w-full text-start"
                >
                  {tag.name}
                </button>
                <div className="flex items-center space-x-2">
                  {tag.id === tagSelected && <CheckIcon size={16} />}
                  <DeleteTag
                    tag={tag}
                    trigger={
                      <button className="rounded-md p-1 hover:opacity-80">
                        <XIcon size={16} />
                      </button>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" onClick={handleDeleteTag}>
            <SearchXIcon size={16} />
            <span>Clear search</span>
          </Button>
          {/* <CreateTag tagsCreated={tags}>
            <Button variant="outline" className="w-full">
              <PlusIcon size={16} />
              <span>Create Tag</span>
            </Button>
          </CreateTag> */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
