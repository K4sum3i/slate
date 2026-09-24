"use server";

import { signOut } from "next-auth/react";
import { db } from "../db";

export const handleSignOut = async () => {
  await signOut();
};

export const checkBlockedEmail = async (email: string) => {
  const result = await db.blockedEmails.findFirst({
    where: {
      email,
    },
  });
  if (result) return true;
  return false;
};
