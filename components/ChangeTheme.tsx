"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Monitor, MoonIcon, SunIcon } from "lucide-react";

export default function ChangeTheme() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          className="inline-flex items-center space-x-0 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
          variant={"ghost"}
          size={"icon-lg"}
          aria-label="Change theme"
          name="Change theme"
        >
          <SunIcon
            size={20}
            strokeWidth={1.5}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={20}
            strokeWidth={1.5}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className={"font-normal"}>
            <p className="text-sm font-medium leading-none">Theme</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"flex items-center space-x-1"}
            onClick={() => setTheme("light")}
          >
            <SunIcon size={16} />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex items-center space-x-1"}
            onClick={() => setTheme("dark")}
          >
            <MoonIcon size={16} />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"flex items-center space-x-1"}
            onClick={() => setTheme("system")}
          >
            <Monitor size={16} />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
