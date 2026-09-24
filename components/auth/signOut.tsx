"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "../ui/toast";
import { handleSignOut } from "@/lib/actions/auth";

export default function signOut() {
  const iconSize = 15;

  const handleLogout = () => {
    toast.promise(handleSignOut(), {
      loading: "Signing out...",
      success: "Signed out successfully.",
      error: "Failed to sign out. Please try again.",
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut size={iconSize} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
