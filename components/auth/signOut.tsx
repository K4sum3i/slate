"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "../ui/toast";

export default function SignOut() {
  const iconSize = 15;

  const handleLogout = () => {
    toast.promise(signOut(), {
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
