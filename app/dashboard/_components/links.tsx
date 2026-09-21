"use client";

import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Searchlinks({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set("search", e.target.value);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-2 top-1/2 -translate-y-1/2 transform text-neutral-400"
        size={16}
      />
      <Input
        type="search"
        autoComplete="off"
        className="pl-8"
        placeholder="Search links"
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
