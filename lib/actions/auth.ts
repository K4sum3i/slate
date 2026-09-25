"use server";

import { db } from "../db";

export const checkBlockedEmail = async (email: string) => {
  const result = await db.blockedEmails.findFirst({
    where: {
      email,
    },
  });

  return !!result;
};
