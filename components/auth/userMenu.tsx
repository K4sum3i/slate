"use client";

import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { DialogTrigger } from "../ui/dialog";

export default function userMenu() {
  const iconSize = 15;
  return (
    <>
      <DropdownMenuItem>
        <Link href={"/"} className="flex items-center gap-2">
          <HomeIcon size={iconSize} />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={"/dashboard"} className="flex items-center gap-2">
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DialogTrigger>
        <DropdownMenuItem>
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </DropdownMenuItem>
      </DialogTrigger>
    </>
  );
}
