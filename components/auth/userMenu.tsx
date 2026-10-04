"use client";

import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LayoutDashboardIcon, SettingsIcon } from "lucide-react";
import { DialogTrigger } from "../ui/dialog";

export default function userMenu() {
  const iconSize = 15;
  return (
    <>
      <DropdownMenuItem>
        <Link href={"/dashboard"} className="flex items-center gap-2">
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DialogTrigger className={"flex items-center gap-2"}>
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </DialogTrigger>
      </DropdownMenuItem>
    </>
  );
}
