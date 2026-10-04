import { Tags } from "@/app/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";

const MAX_TAGS = 2;

export default function selectedTags({
  tags,
  selectedTags,
  onSelectTag,
  onDeleteTag,
}: {
  tags: Tags[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}) {
  const available = tags.filter((tag) => !selectedTags.includes(tag.id));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-medium">Tags</p>
        <p className="text-xs text-muted-foreground tabular-nums">
          {selectedTags.length} / {MAX_TAGS}
        </p>
      </div>

      <Select
        value={null}
        onValueChange={(value) => value && onSelectTag(value)}
        disabled={selectedTags.length >= MAX_TAGS || tags.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add a tag" />
        </SelectTrigger>
        <SelectContent>
          {available.map((tag) => (
            <SelectItem key={tag.id} value={tag.id}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {selectedTags.map((id) => {
            const tag = tags.find((t) => t.id === id);
            if (!tag) return null;

            return (
              <li
                key={id}
                className="inline-flex items-center gap-1.5 rounded-full border border-border py-0.5 pr-1 pl-2 text-xs"
              >
                {tag.color && (
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                )}
                {tag.name}
                <button
                  type="button"
                  onClick={() => onDeleteTag(id)}
                  className="grid size-4 place-items-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <XIcon className="size-3" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
