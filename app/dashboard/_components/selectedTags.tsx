import { Tags } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";

export default function selectedTags({
  className,
  tags,
  selectedTags,
  onSelectTag,
  onDeleteTag,
}: {
  className?: string;
  tags: Tags[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Add tags to your links
      </p>
      <Select onValueChange={(value) => onSelectTag(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTags.length > 0 && (
        <div className="flex items-center overflow-hidden rounded-md border border-neutral-200 p-2 text-sm tracking-tight shadow-sm dark-border-neutral-800">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="mr-1 flex items-center space-x-2 rounded-md bg-neutal-200 px-2 py-1 dark:bg-neutral-800"
            >
              <span>{tags.find((t) => t.id === tag)?.name}</span>
              <Button
                type="button"
                className={
                  "opacity-50 transition-opacity duration-200 hover:opacity-100"
                }
                onClick={() => onDeleteTag(tag)}
              >
                <XIcon size={12} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
