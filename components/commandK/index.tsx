"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { ChangeTheme, Pages } from "./items";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { useTheme } from "next-themes";

export default function commandK() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleRoutePush = async (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
    (setOpen(false),
      toast.add({
        type: "success",
        description: `Theme change to ${theme}`,
      }));
  };

  return (
    <>
      <Button
        variant={"ghost"}
        size={"icon-lg"}
        className="inline-flex items-center space-x-0 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Search size={20} strokeWidth={1.5} />
        <span className="sr-only">Open command Search Dialog</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="General">
              {Pages.map((page) => (
                <CommandItem
                  key={page.href}
                  onSelect={() => handleRoutePush(page.href)}
                >
                  <page.icon size={22} strokeWidth={1.5} />
                  <span>{page.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Theme">
              {ChangeTheme.map((theme) => (
                <CommandItem
                  key={theme.param}
                  value={`Change Theme: ${theme.name}`}
                  onSelect={() => handleChangeTheme(theme.param)}
                >
                  <theme.icon size={22} strokeWidth={1.5} />
                  <span>{theme.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
