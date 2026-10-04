"use client";

import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "cn";
import { Search, XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Searchlinks({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const urlValue = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(urlValue);
  const [syncedUrl, setSyncedUrl] = useState(urlValue);

  const pushSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("search", value);
    else params.delete("search");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearch = useDebouncedCallback(pushSearch, 300);

  if (urlValue !== syncedUrl) {
    setSyncedUrl(urlValue);
    if (!handleSearch.isPending()) setSearch(urlValue);
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  const clear = () => {
    handleSearch.cancel();
    setSearch("");
    pushSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
        size={16}
      />
      <Input
        ref={inputRef}
        type="search"
        autoComplete="off"
        placeholder="Search by Slug"
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Escape" && search) clear();
        }}
        className="h-8 pr-8 pl-8 [&::-webkit-search-cancel-button]:hidden"
      />
      {search ? (
        <button
          type="button"
          onClick={clear}
          className="absolute top-1/2 right-1.5 grid size-5 -translate-y-1/2 place-items-center rounded-sm text-muted-foreground outline-none transition-[color,transform] duration-100 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 active:scale-[0.94] motion-reduce:active:scale-100"
        >
          <XIcon className="size-3.5" />
        </button>
      ) : (
        <Kbd className="absolute top-1/2 right-2 hidden -translate-y-1/2 md:inline-flex">
          /
        </Kbd>
      )}
    </div>
  );
}
