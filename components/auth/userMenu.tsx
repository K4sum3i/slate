"use client";

import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";

export default function userMenu() {
  const iconSize = 15;
  return (
    <>
      <DropdownMenuItem>
        <Link href={"/"}>
          <HomeIcon size={iconSize} />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={"/dashboard"}>
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={"/dashboard/settings"}>
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
    </>
  );
}
