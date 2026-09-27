"use client";

import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Searchlinks({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() ?? "",
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
    handleSearch(value);
  };

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
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}
